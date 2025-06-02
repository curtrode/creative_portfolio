StirFry = 
  Utils:
    transposeArray: (d2) ->
      acc1 = []
      for i in [0...d2[0].length]
        acc2 = []
        for d1 in d2
          acc2.push(d1[i])
        acc1.push(acc2)
      acc1
    transformCsv: (rows) ->
      acc1 = []
      for row in rows
        i = 0
        acc2 = []
        loop 
          break unless row["item.#{i}.text"]?
          acc2.push
            text: row["item.#{i}.text"]
            audio: row["item.#{i}.audio"]
          i += 1
        acc1.push acc2
      acc1

  Container: class Container
    constructor: (data, elem) ->
      @data  = data
      @elem  = elem
      @state = 0
      @nodes = []
      @setup()
    transposedData: => StirFry.Utils.transposeArray(@data)
    contentHolder: => @elem.find('[data-content]')
    reorderBtn: => @elem.find('[data-reorder]')
    audioBtn: => @elem.find('[data-audio]')
    setup: =>
      @elem.data('stirfry', this)
      for _data in @data
        node = new StirFry.Node(_data, 0, this)
        @nodes.push(node)
      @reorderBtn().on 'click', (e) =>
        e.preventDefault()
        @state = (@state + 1) % @transposedData().length
        for node in @nodes
          node.rotate(@state)
        false
      @audioBtn().on 'click', (e) =>
        e.preventDefault()
        playAudio = (i) =>
          node = @nodes[i]
          node.toggleHighlight()
          audio = new Audio(node.data[node.state].audio);
          audio.addEventListener 'ended', =>
            i += 1
            node.toggleHighlight()
            playAudio(i) if i < @nodes.length
          audio.play()
        playAudio(0)
        false

  Node: class Node
    constructor: (data, state, parent) ->
      @data   = data
      @state  = state
      @parent = parent
      @elem   = $('<span data-type="t"/>')
      @setup()
    rotate: (_state) =>
      _state ||= ((@state + 1) % @data.length)
      @state = _state
      @update()
    update: =>
      @elem
        .attr('class', "passage#{@state}")
        .html(@data[@state].text)
    toggleHighlight: => @elem.toggleClass('highlight')
    setup: =>
      @elem.appendTo(@parent.contentHolder())
      @update()
      @elem.data('stirfry', this)

      @elem.on 'mouseover', (e) =>
        @rotate()

$(document).ready ->   
  _ = new StirFry.Container(window['stirfry-data'], $('#stirfry'))
  # Papa.parse "/assets/data.csv",
  #   header: true
  #   complete: (results) ->
  #     data = StirFry.Utils.transformCsv(results.data)
  #     _ = new StirFry.Container(data, $('#stirfry'))