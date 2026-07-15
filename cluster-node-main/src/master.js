import http from 'node:http'
import fs from 'node:fs/promises'
import cluster from 'node:cluster'
import process from 'node:process'
import { Buffer } from 'node:buffer'
import { randomUUID } from 'node:crypto'

import * as bufferFunction from './manipulator/buffer.js'
import { dividirMatriz } from './manipulator/matriz.js'
import { aplicarFiltroPretoBranco } from './manipulator/filter.js'

const NUM_WORKERS = 3
const TIMEOUT_MS = 30_000
const PORT = 8000
const jobQueue = []
const workerStatus = new Map()
const pendingRequests = new Map()

if (cluster.isPrimary) {
    startMaster()
} else {
    startWorker()
}

function startMaster() {
    for (let i = 0; i < NUM_WORKERS; i++) {
        const worker = cluster.fork() 
        workerStatus.set(worker.process.pid, 'free') 

        worker.on('message', ({ id, partIndex, result }) => {
            workerStatus.set(worker.process.pid, 'free') 
            processQueue() 

            const reqData = pendingRequests.get(id)
            if (!reqData) return 

            reqData.results[partIndex] = result

            if (reqData.results.filter(Boolean).length === reqData.results.length) {
                pendingRequests.delete(id) 
                reqData.resolve(reqData.results) 
            }
        })
    }

    const server = http.createServer((req, res) => {
        if (req.url === '/upload' && req.method === 'POST') {
            handleUpload(req, res)
        } else {
            sendResponse(res, 404, 'Not Found') 
        }
    })

    server.listen(PORT, () =>
        console.log(`HTTP Master rodando na porta ${PORT}`)
    )
}

function startWorker() {
    process.on('message', ({ id, partIndex, part }) => {
        const result = aplicarFiltroPretoBranco(part) 
        process.send({ id, partIndex, result }) 
    })
}

async function handleUpload(request, response) {
    const timeoutHandle = setTimeout(() => {
        sendResponse(response, 504, 'Timeout processing image')
    }, TIMEOUT_MS)

    try {
        const IMG_ID = randomUUID()
        const fileName = `img-received-${IMG_ID}.png`
        
        const requestId = randomUUID()

        const buffer = await collectRequestBuffer(request)
        await fs.writeFile(fileName, buffer)

        const { data, info } = await bufferFunction.criarBuffer(fileName)
        const matriz = bufferFunction.bufferParaMatriz(data, info)

        const parts = dividirMatriz(matriz, NUM_WORKERS)

        const reqPromise = new Promise((resolve, reject) => {
            pendingRequests.set(requestId, {
                results: new Array(parts.length), 
                info,
                resolve,
                reject
            })
        })

        parts.forEach((part, index) => {
            jobQueue.push({ id: requestId, partIndex: index, part })
        })

        processQueue()

        const results = await reqPromise
        clearTimeout(timeoutHandle) 

        finalizeImage(results, info, response, IMG_ID)
    } catch (err) {
        console.error(err)
        clearTimeout(timeoutHandle)
        sendResponse(response, 500, 'Server error')
    }
}

function processQueue() {
    for (const id of Object.keys(cluster.workers)) {
        const worker = cluster.workers[id]
        if (!worker) continue

        if (workerStatus.get(worker.process.pid) === 'free' && jobQueue.length > 0) {
            const job = jobQueue.shift() 
            workerStatus.set(worker.process.pid, 'busy') 
            worker.send(job) 
        }
    }
}

function finalizeImage(results, info, response, id) {
    try {
        const matrizFinal = results.flat()

        bufferFunction.matrizParaBuffer(matrizFinal, info, id)

        sendResponse(response, 200, 'Imagem processada com sucesso')
    } catch (err) {
        console.error('Erro ao montar buffer final:', err)
        sendResponse(response, 500, 'Error reconstructing image')
    }
}

async function collectRequestBuffer(request) {
    const chunks = []
    for await (const chunk of request) {
        chunks.push(chunk)
    }
    return Buffer.concat(chunks) 
}

function sendResponse(response, statusCode, message) {
    if (!response.headersSent) {
        response.writeHead(statusCode, { 'Content-Type': 'text/plain' })
        response.end(message)
    }
}
