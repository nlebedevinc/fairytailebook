function selectPage(evt) {
    const target = evt.target;
    const pageName = target.innerHTML || target.textContent;

    if (pageName === 'Главная') {
        toggleMainPage(false);
        // remove all other content
    } else {
        toggleMainPage(true);
        const page = findPageByName(pageName);

        // render
        renderPage(page.sidebar);
        renderFirstStory(pageName);
    }

    // mark selected
    unmarkAllPages();
    target.classList.add('active');
}

function selectStory(evt) {
    const target = evt.target;

    if (target.tagName !== 'LI') {
        return;
    }

    const name = target.innerText || target.textContent;

    const story = findStoryByName(name);

    // render
    renderStory(story);

    // mark selected
    unmarkAllItems();
    target.classList.add('active');
}

function toggleMainPage(isDisabled) {
    const homepage = document.getElementById('homepage');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    if (isDisabled) {
        homepage.classList.add('disabled');
        sidebar.classList.remove('disabled');
        content.classList.remove('disabled');
    } else {
        homepage.classList.remove('disabled');
        sidebar.classList.add('disabled');
        content.classList.add('disabled');
    }
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

function renderFirstStory(pageName) {
    const name = firstStoryOnPage(pageName);
    const story = findStoryByName(name);

    renderStory(story);

    markActive(name);
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

    const subtitle = createStoryReadTime(story);
    header.appendChild(subtitle);

    if (story.audio){
        const audio = createStoryAudio(story.audio);
        header.appendChild(audio);
        audiojs.create(audio);
    }

    parent.appendChild(header);

    renderStoryText(parent, story.text);
}

function createStoryName(name) {
    const header = document.createElement('H1');
    const text = document.createTextNode(name);
    header.appendChild(text);

    return header;
}

function createStoryAudio(link) {
    const audio = document.createElement('audio');
    audio.src = link;
    audio.preload = 'auto';

    return audio;
}

function createStoryReadTime(story) {
    const time = calcAverageReadingTime(story);
    const p = document.createElement('p');
    p.classList.add('readtime');
    const text = document.createTextNode(`${time} минут чтения`);
    p.appendChild(text);

    return p;
}

function renderStoryText(parent, text) {
    for (let i = 0; i < text.length; ++i) {
        let element;
        if (text[i].indexOf('images') !== -1) {
            element = new Image();
            element.src = text[i];
        } else if (!isNaN(text[i])) {
            element = document.createElement('H3');
            const t = document.createTextNode(text[i]);
            element.appendChild(t);
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

function markActive(storyName) {
    const items = document.getElementsByClassName('sublist-item');

    for (let i = 0; i < items.length; ++i) {
        const name = items[i].innerText || items[i].textContent;

        if (storyName === name) {
            items[i].classList.add('active');
            break;
        }
    }
}
