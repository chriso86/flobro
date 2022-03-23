import { Flobro } from '../src'
import { UUID } from '../src/domain/interfaces/custom-types'
import { Link } from '../src/domain/models/builder/link'
import { Block } from '../src/domain/models/builder/block'
import { LinkSocket } from '../src/domain/models/builder/link.socket'
import {
  DEFAULT_BLOCK_CAN_DELETE,
  DEFAULT_BLOCK_CAN_EDIT,
  DEFAULT_BLOCK_CAN_VIEW,
  DEFAULT_LINK_CAN_DELETE,
  DEFAULT_LINK_CAN_EDIT,
  DEFAULT_LINK_CAN_VIEW,
  DEFAULT_SOCKET_CAN_DELETE,
  DEFAULT_SOCKET_CAN_EDIT,
  DEFAULT_SOCKET_CAN_VIEW,
} from '../src/utils/default.constants'

const GenerateUUIDSection = (length: number) => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

const GenerateUUID = () => {
  return `${GenerateUUIDSection(8)}-${GenerateUUIDSection(
    4
  )}-${GenerateUUIDSection(4)}-${GenerateUUIDSection(15)}`
}

beforeEach(() => {
  //@ts-ignore
  ;(global as any).crypto = {
    getRandomValues<T>(array: T): T {
      return array
    },
    subtle: undefined,
    randomBytes: (num: number[]) => {
      return num
    },
  }
})

test('Construct Flobro', () => {
  const container = document.createElement('div')
  const flobro = new Flobro(container)

  expect(flobro).toBeDefined()
})

test('Create two blocks with two sockets (each side), and connect them', () => {
  const container = document.createElement('div')
  const flobro = new Flobro(container)
  const numBlocks = 2
  const numInSidesPerBlock = 1
  const numOutSidesPerBlock = 1
  const connectAllBlocks = true

  for (let b = 0; b < numBlocks; b++) {
    const id = GenerateUUID()
    const title = `Block no. ${b + 1}`
    const content = `
      <div>
        <strong> This is a test block </strong>
      </div>
    `
    const data = {
      name: 'testBlock',
      nestedObj: {
        test: 12,
      },
    }
    const position = {
      x: 10,
      y: 10,
    }
    const block = flobro.addBlock({
      id,
      title,
      content,
      position,
      data,
    })

    // Test block properties and existence on state
    expect(block.id).toEqual(id)
    expect(block.title).toEqual(title)
    expect(block.content).toEqual(content)
    expect(block.data).toEqual(data)
    expect(block.position).toEqual(position)
    expect(block.canEdit).toEqual(DEFAULT_BLOCK_CAN_EDIT)
    expect(block.canView).toEqual(DEFAULT_BLOCK_CAN_VIEW)
    expect(block.canDelete).toEqual(DEFAULT_BLOCK_CAN_DELETE)

    expect(flobro.state.blocks.get(id)!.id).toEqual(block.id)

    // Add input sockets to block
    for (let s = 0; s < numInSidesPerBlock; s++) {
      const socketId = GenerateUUID()
      const socketData = {
        side: 'in',
        nestedObj: {
          test: 12,
        },
      }
      const socket = block.addSocket({
        id: socketId,
        side: 'in',
        data: socketData,
      })

      // Test socket (input)
      expect(socket.id).toEqual(socketId)
      expect(socket.side).toEqual('in')
      expect(socket.data).toEqual(socketData)
      expect(socket.links).toEqual(new Map<UUID, Link<unknown>>())
      expect(socket.canView).toEqual(DEFAULT_SOCKET_CAN_VIEW)
      expect(socket.canDelete).toEqual(DEFAULT_SOCKET_CAN_DELETE)
      expect(socket.canEdit).toEqual(DEFAULT_SOCKET_CAN_EDIT)

      expect(block.inSockets.get(socketId)).toEqual(socket)
    }

    // Add output sockets to block
    for (let s = 0; s < numOutSidesPerBlock; s++) {
      const socketId = GenerateUUID()
      const socketData = {
        side: 'out',
        nestedObj: {
          test: 12,
        },
      }
      const socket = block.addSocket({
        id: socketId,
        side: 'out',
        data: socketData,
      })

      // Test socket (output)
      expect(socket.id).toEqual(socketId)
      expect(socket.side).toEqual('out')
      expect(socket.data).toEqual(socketData)
      expect(socket.links).toEqual(new Map<UUID, Link<unknown>>())
      expect(socket.canView).toEqual(DEFAULT_SOCKET_CAN_VIEW)
      expect(socket.canDelete).toEqual(DEFAULT_SOCKET_CAN_DELETE)
      expect(socket.canEdit).toEqual(DEFAULT_SOCKET_CAN_EDIT)

      expect(block.outSockets.get(socketId)).toEqual(socket)
    }
  }

  if (connectAllBlocks) {
    const blocks = Array.from(flobro.state.blocks.values())
    const connectorMap: {
      currentBlockId: string | null
      nextBlockId: string | null
      currentBlockOutputId: string | null
      nextBlockInputId: string | null
    }[] = blocks
      .map((block: Block<unknown>, index: number, array: Block<unknown>[]) => {
        const processThisBlock = index + 1 < array.length

        if (processThisBlock) {
          const nextBlock = array[index + 1]
          const outKeys = Array.from(block.outSockets.keys())
          const inKeys = Array.from(nextBlock.inSockets.keys())

          return {
            currentBlockId: block.id ?? null,
            nextBlockId: nextBlock.id ?? null,
            currentBlockOutputId: block.outSockets.get(outKeys[0])?.id ?? null,
            nextBlockInputId: nextBlock.inSockets.get(inKeys[0])?.id ?? null,
          }
        }

        return {
          currentBlockId: null,
          nextBlockId: null,
          currentBlockOutputId: null,
          nextBlockInputId: null,
        }
      })
      .filter((c) => !!c.nextBlockInputId && !!c.currentBlockOutputId)

    console.log(connectorMap)

    connectorMap.forEach((connector) => {
      const originBlock = flobro.state.blocks.get(connector.currentBlockId!)!
      const targetBlock = flobro.state.blocks.get(connector.nextBlockId!)!
      expect(originBlock).toBeDefined()
      expect(targetBlock).toBeDefined()

      if (!connector.currentBlockOutputId) {
        throw new Error('Current block output ID is not defined')
      }

      const originSocket = originBlock.outSockets.get(
        connector.currentBlockOutputId
      )!

      if (!connector.nextBlockInputId) {
        throw new Error('Next block input ID is not defined')
      }

      const targetSocket = targetBlock.inSockets.get(
        connector.nextBlockInputId
      )!
      expect(originSocket).toBeDefined()
      expect(targetSocket).toBeDefined()
      const linkId = GenerateUUID()
      const linkData = {
        link: true,
      }
      const start = { x: 1, y: 2 }
      const startCurve = { x: 10, y: 22 }
      const endCurve = { x: 30, y: 40 }
      const end = { x: 3, y: 4 }
      const link = originSocket.addLink(
        {
          id: linkId,
          data: linkData,
          start,
          startCurve,
          endCurve,
          end,
        },
        'origin'
      )

      link.updateOrigin(originSocket)
      link.updateTarget(targetSocket)

      if (!link.origin) {
        throw new Error('Origin was not set correctly')
      }

      if (!link.target) {
        throw new Error('Target was not set correctly')
      }

      // Test link
      expect(link.id).toEqual(linkId)
      expect(link.data).toEqual(linkData)
      expect(link.start).toEqual(start)
      expect(link.startCurve).toEqual(startCurve)
      expect(link.endCurve).toEqual(endCurve)
      expect(link.end).toEqual(end)
      expect(link.linkSockets).toEqual(new Map<UUID, LinkSocket<unknown>>())
      expect(link.origin.id).toEqual(originSocket.id)
      expect(link.target.id).toEqual(targetSocket.id)
      expect(link.canView).toEqual(DEFAULT_LINK_CAN_VIEW)
      expect(link.canDelete).toEqual(DEFAULT_LINK_CAN_DELETE)
      expect(link.canEdit).toEqual(DEFAULT_LINK_CAN_EDIT)

      expect(originSocket.links.get(linkId)).toEqual(link)
    })
  }
})
