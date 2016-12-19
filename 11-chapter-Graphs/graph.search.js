(function (exports) {
  const {stack} = require('../04-chapter-Stack/')
  const {queue} = require('../05-chapter-Queue/')
  let graph
  let keys
  let graphProto

  const displayVertex = (node) => console.log(node)

  const getUnvistedVertex = (vertex) => {
    for (let node in graph[vertex].edges) {
      if (graph[node].visited === false) {
        return node
      }
    }
    return false
  }

  const dfs = () => {
    let graphStack = stack()
    graphProto.getVertex(keys[0]).visited = true
    displayVertex(keys[0])
    graphStack.push(keys[0])

    while (!graphStack.isEmpty()) {
      let unvistedVertex = getUnvistedVertex(graphStack.peek())

      if (unvistedVertex === false) {
        graphStack.pop()
      } else {
        graph[unvistedVertex].visited = true
        displayVertex(unvistedVertex)
        graphStack.push(unvistedVertex)
      }
    }
  }

  const bfs = () => {
    let unvistedVertex
    let graphQueue = queue()
    graphProto.getVertex(keys[0]).visited = true
    displayVertex(keys[0])
    graphQueue.enqueue(keys[0])

    while (!graphQueue.isEmpty()) {
      let tempVertex = graphQueue.dequeue()
      unvistedVertex = getUnvistedVertex(tempVertex)

      while (unvistedVertex !== false) {
        graphProto.getVertex(unvistedVertex).visited = true
        displayVertex(unvistedVertex)
        graphQueue.enqueue(unvistedVertex)
        unvistedVertex = getUnvistedVertex(tempVertex)
      }
    }
  }

  function searchFactory (g) {
    graphProto = this
    graph = g
    keys = Object.keys(graph)

    return Object.assign({}, {dfs, bfs})
  }

  Object.assign(exports, {graphSearch: searchFactory})
}((typeof module.exports !== undefined) ? module.exports : window))
