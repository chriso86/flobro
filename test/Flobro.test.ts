import { FloBro } from '../src'
import {
  DEFAULT_BLOCK_FILL_COLOR,
  DEFAULT_BLOCK_HEIGHT,
  DEFAULT_BLOCK_STROKE_COLOR,
  DEFAULT_BLOCK_STROKE_WIDTH,
  DEFAULT_BLOCK_WIDTH,
  DEFAULT_LINK_STROKE_COLOR,
  DEFAULT_LINK_STROKE_WIDTH,
  DEFAULT_SOCKET_FILL_COLOR,
  DEFAULT_SOCKET_RADIUS,
  DEFAULT_SOCKET_STROKE_COLOR,
  DEFAULT_SOCKET_STROKE_WIDTH,
} from '../src/utils/default.constants'
import { CircleStyle } from '../src/domain/circle-style'
import { BlockStyle } from '../src/domain/block-style'
import { IFill } from '../src/domain/interfaces/fill.interface'
import { IStroke } from '../src/domain/interfaces/stroke.interface'
import { Style } from '../src/domain/style'
import { UUID } from '../src/domain/interfaces/custom-types'
import { ILink } from '../src/domain/interfaces/link.interface'
import { IBlock } from '../src/domain/interfaces/block.interface'
import { ILinkSocket } from '../src/domain/interfaces/link-socket.interface'

// Current coverage - 62.81% (2022-02-15) - TODO: INCREASE COVERAGE AND UPDATE THIS

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

test('Construct Flobro', () => {
  const container = document.createElement('div')
  const flobro = new FloBro(container)

  expect(flobro).toBeDefined()
})

test('Theme should be set', () => {
  const container = document.createElement('div')
  const flobro = new FloBro(container)

  // Block theme style is set
  expect(flobro.state.theme.blockStyle.stroke.width).toEqual(
    DEFAULT_BLOCK_STROKE_WIDTH
  )
  expect(flobro.state.theme.blockStyle.stroke.color).toEqual(
    DEFAULT_BLOCK_STROKE_COLOR
  )
  expect(flobro.state.theme.blockStyle.fill.color).toEqual(
    DEFAULT_BLOCK_FILL_COLOR
  )
  expect(flobro.state.theme.blockStyle.width).toEqual(DEFAULT_BLOCK_WIDTH)
  expect(flobro.state.theme.blockStyle.height).toEqual(DEFAULT_BLOCK_HEIGHT)

  // Socket theme style is set
  expect(flobro.state.theme.socketStyle.stroke.width).toEqual(
    DEFAULT_SOCKET_STROKE_WIDTH
  )
  expect(flobro.state.theme.socketStyle.stroke.color).toEqual(
    DEFAULT_SOCKET_STROKE_COLOR
  )
  expect(flobro.state.theme.socketStyle.fill.color).toEqual(
    DEFAULT_SOCKET_FILL_COLOR
  )
  expect(flobro.state.theme.socketStyle.radius).toEqual(DEFAULT_SOCKET_RADIUS)

  // Link theme style is set
  expect(flobro.state.theme.linkStyle.stroke.width).toEqual(
    DEFAULT_LINK_STROKE_WIDTH
  )
  expect(flobro.state.theme.linkStyle.stroke.color).toEqual(
    DEFAULT_LINK_STROKE_COLOR
  )
})

test('Theme should change to new settings', () => {
  const container = document.createElement('div')
  const flobro = new FloBro(container)
  const newFill: IFill = { color: '#f00' }
  const newStroke: IStroke = { color: '#f00', width: 5000 }
  const blockStyle = new BlockStyle(5000, 6000, newFill, newStroke)
  const socketStyle = new CircleStyle(5000, newFill, newStroke)
  const linkStyle = new Style(newFill, newStroke)

  flobro.changeTheme({
    blockStyle,
    socketStyle,
    linkStyle,
  })

  // Block theme style is set
  expect(flobro.state.theme.blockStyle.stroke.width).toEqual(newStroke.width)
  expect(flobro.state.theme.blockStyle.stroke.color).toEqual(newStroke.color)
  expect(flobro.state.theme.blockStyle.fill.color).toEqual(newFill.color)
  expect(flobro.state.theme.blockStyle.width).toEqual(blockStyle.width)
  expect(flobro.state.theme.blockStyle.height).toEqual(blockStyle.height)

  // Socket theme style is set
  expect(flobro.state.theme.socketStyle.stroke.width).toEqual(newStroke.width)
  expect(flobro.state.theme.socketStyle.stroke.color).toEqual(newStroke.color)
  expect(flobro.state.theme.socketStyle.fill.color).toEqual(newFill.color)
  expect(flobro.state.theme.socketStyle.radius).toEqual(socketStyle.radius)

  // Link theme style is set
  expect(flobro.state.theme.linkStyle.stroke.width).toEqual(newStroke.width)
  expect(flobro.state.theme.linkStyle.stroke.color).toEqual(newStroke.color)
})

test('Create two blocks with two sockets (each side), and connect them', () => {
  const container = document.createElement('div')
  const flobro = new FloBro(container)
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
    const style = new BlockStyle(
      6000,
      7000,
      { color: '#f00' },
      { color: '#f00', width: 5000 }
    )
    const block = flobro.addBlock({
      id,
      title,
      content,
      data,
      position,
      canEdit: false,
      canView: false,
      canDelete: false,
      style,
    })

    // Test block properties and existence on state
    expect(block.id).toEqual(id)
    expect(block.title).toEqual(title)
    expect(block.content).toEqual(content)
    expect(block.data).toEqual(data)
    expect(block.position).toEqual(position)
    expect(block.canEdit).toEqual(false)
    expect(block.canView).toEqual(false)
    expect(block.canDelete).toEqual(false)
    expect(block.style).toEqual(style)

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
      const socketStyle = new CircleStyle(
        5000,
        { color: '#f00' },
        { color: '#f00', width: 5000 }
      )
      const socket = block.addSocket({
        id: socketId,
        side: 'in',
        data: socketData,
        style: socketStyle,
        canView: false,
        canDelete: false,
        canEdit: false,
      })

      // Test socket (input)
      expect(socket.id).toEqual(socketId)
      expect(socket.side).toEqual('in')
      expect(socket.data).toEqual(socketData)
      expect(socket.style).toEqual(socketStyle)
      expect(socket.links).toEqual(new Map<UUID, ILink<unknown>>())
      expect(socket.canView).toEqual(false)
      expect(socket.canDelete).toEqual(false)
      expect(socket.canEdit).toEqual(false)

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
      const socketStyle = new CircleStyle(
        5000,
        { color: '#f00' },
        { color: '#f00', width: 5000 }
      )
      const socket = block.addSocket({
        id: socketId,
        side: 'out',
        data: socketData,
        style: socketStyle,
        canView: false,
        canDelete: false,
        canEdit: false,
      })

      // Test socket (output)
      expect(socket.id).toEqual(socketId)
      expect(socket.side).toEqual('out')
      expect(socket.data).toEqual(socketData)
      expect(socket.style).toEqual(socketStyle)
      expect(socket.links).toEqual(new Map<UUID, ILink<unknown>>())
      expect(socket.canView).toEqual(false)
      expect(socket.canDelete).toEqual(false)
      expect(socket.canEdit).toEqual(false)

      expect(block.inSockets.get(socketId)).toEqual(socket)
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
      .map(
        (block: IBlock<unknown>, index: number, array: IBlock<unknown>[]) => {
          const processThisBlock = index + 1 < array.length

          if (processThisBlock) {
            const nextBlock = array[index + 1]
            const outKeys = Array.from(block.outSockets.keys())
            const inKeys = Array.from(nextBlock.inSockets.keys())

            return {
              currentBlockId: block.id ?? null,
              nextBlockId: nextBlock.id ?? null,
              currentBlockOutputId:
                block.outSockets.get(outKeys[0])?.id ?? null,
              nextBlockInputId: nextBlock.inSockets.get(inKeys[0])?.id ?? null,
            }
          }

          return {
            currentBlockId: null,
            nextBlockId: null,
            currentBlockOutputId: null,
            nextBlockInputId: null,
          }
        }
      )
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
      const linkStyle = new Style(
        { color: '#f00' },
        { color: '#f00', width: 5000 }
      )
      const startX = 1
      const startY = 2
      const startCurveX = 10
      const startCurveY = 20
      const endCurveX = 30
      const endCurveY = 40
      const endX = 3
      const endY = 4
      const link = originSocket.addLink({
        id: linkId,
        data: linkData,
        style: linkStyle,
        startX,
        startY,
        startCurveX,
        startCurveY,
        endCurveX,
        endCurveY,
        endX,
        endY,
        canView: false,
        canDelete: false,
        canEdit: false,
      })

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
      expect(link.style).toEqual(linkStyle)
      expect(link.startX).toEqual(startX)
      expect(link.startY).toEqual(startY)
      expect(link.startCurveX).toEqual(startCurveX)
      expect(link.startCurveY).toEqual(startCurveY)
      expect(link.endCurveX).toEqual(endCurveX)
      expect(link.endCurveY).toEqual(endCurveY)
      expect(link.endX).toEqual(endX)
      expect(link.endY).toEqual(endY)
      expect(link.linkSockets).toEqual(new Map<UUID, ILinkSocket<unknown>>())
      expect(link.origin.id).toEqual(originSocket.id)
      expect(link.target.id).toEqual(targetSocket.id)
      expect(link.canView).toEqual(false)
      expect(link.canDelete).toEqual(false)
      expect(link.canEdit).toEqual(false)

      expect(originSocket.links.get(linkId)).toEqual(link)
    })
  }
})
