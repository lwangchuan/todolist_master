describe('add todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('Koa • Todo');
    })
    it('should new todo correct', async function() {
      await page.click('#new-todo', {delay: 500});
      await page.type('#new-todo', 'new todo item', {delay: 50});
      await page.keyboard.press("Enter");
      let todoList = await page.waitFor('#todo-list');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
      expect(expectInputContent).to.eql('new todo item');
    }) 
    it('render all item', async function(){
      let todoList = await page.waitFor('#todoList');
      
      const flag = await page.evaluate(function(todoList){
        if(todoList.childNodes.item(0).textContent == 'React practice' && todoList.childNodes.item(1).textContent == 'game time'){
          return true;
        }else{
          return false;
        }
      }, todoList);
      expect(flag).to.eql(true);
  })
  it('do it', async function(){
    await page.click('#testContext', {delay:500});
    let todoList = await page.waitFor('#todoList');
    const realStatus = await page.evaluate(function(todoList){
      return todoList.lastChild.className;
    },todoList)
    expect(realStatus).to.eql('done-item');
  })

  it('undo it', async function(){
    await page.click('#testContext', {delay:500});
    let todoList = await page.waitFor('#todoList');
    const realStatus = await page.evaluate(function(todoList){
      return todoList.lastChild.className;
    },todoList)
    expect(realStatus).to.eql('item');
  })


  });