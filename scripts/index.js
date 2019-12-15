// API
function selectPage(evt) {
    const target = evt.target;
    const pageName = target.innerHTML || target.textContent;

    const page = findPageByName(pageName);

    // render
    renderPage(page.sidebar);

    // mark selected
    unmarkAllPages();
    target.classList.add('active');
}

function selectStory(evt) {
    const target = evt.target;
    const name = target.innerText || target.textContent;

    const story = findStoryByName(name);

    // render
    renderStory(story);

    // mark selected
    unmarkAllItems();
    target.classList.add('active');
}

// render
function renderPage(sidebar) {
    const parent = document.getElementById('sidebar-content');
    parent.innerHTML = '';
    
    for (let i = 0; i < sidebar.length; ++i) {
        const parentli = document.createElement('li');
        const div = document.createElement('div');
        const h3 = document.createElement('H3');
        const text = document.createTextNode(sidebar[i].title);
        h3.appendChild(text);
        div.appendChild(h3);
        const ul = document.createElement('ul');
        ul.classList.add('sublist');
        
        const list = createStoryList(sidebar[i].list);

        list.forEach(item => ul.appendChild(item));
        div.appendChild(ul);

        parentli.appendChild(div);

        parent.appendChild(parentli);
    }
}

function createStoryList(list) {
    const elements = [];
    for (let i = 0; i < list.length; ++i) {
        const li = document.createElement('li');
        const text = document.createTextNode(list[i]);
        li.appendChild(text);
        li.classList.add('sublist-item');
        elements.push(li);
    }

    return elements;
}

function renderStory(story) {
    const parent = document.getElementById('content');
    parent.innerHTML = '';

    const header = createStoryName(story.name);
    parent.appendChild(header);

    renderStoryText(parent, story.text);
}

function createStoryName(name) {
    const header = document.createElement('H1');
    const text = document.createTextNode(name);
    header.appendChild(text);

    return header;
}

function renderStoryText(parent, text) {
    for (let i = 0; i < text.length; ++i) {
        let element;
        if (text[i].indexOf('images') !== -1) {
            element = new Image();
            element.src = text[i];
        } else {
            element = document.createElement('p');
            const t = document.createTextNode(text[i]);
            element.appendChild(t);
        }

        parent.appendChild(element);
    }
}

function unmarkAllPages() {
    const items = document.getElementsByClassName('nav-item');

    for (let i = 0; i < items.length; ++i) {
        items[i].classList.remove('active');
    }
}

function unmarkAllItems() {
    const items = document.getElementsByClassName('sublist-item');

    for (let i = 0; i < items.length; ++i) {
        items[i].classList.remove('active');
    }
}