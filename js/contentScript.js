

const multiBlurOpenAnimation = () => {
  const multiBlurContent = document.getElementById(
    'priv-share-multi-blur-button-content'
  );

  // running the expanding animation on hidden content block
  multiBlurContent.classList.toggle('priv-share-dock-hidden-content');
  multiBlurContent.classList.toggle('priv-share-dock-show-multi-blur-content');

  // hiding main dock buttons
  const blurAdjustmentBlock = document.getElementById(
    'priv-share-blur-adjustment-block'
  );
  blurAdjustmentBlock.classList.toggle('priv-share-dock-item-hide');

  const mainDockButtons = document.querySelectorAll(
    '.priv-share-dock-main > .priv-share-dock-item'
  );

  mainDockButtons.forEach((mainDockButton) => {
    mainDockButton.classList.toggle('priv-share-dock-item-hide');
  });

  // running the expanding animnation on main dock
  const mainDock = document.getElementsByClassName('priv-share-dock-main')[0];
  mainDock.classList.toggle('priv-share-dock-show-multi-blur-content');
  mainDock.classList.remove('priv-share-dock-show-multi-blur-content-reverse');

  // const dock = document.getElementsByClassName('priv-share-dock')[0];
  // dock.style.alignItems = 'flex-end';
};

const multiBlurClosingAnimation = () => {
  const multiBlurContent = document.getElementById(
    'priv-share-multi-blur-button-content'
  );

  // running the expanding animation on hidden content block
  multiBlurContent.classList.toggle('priv-share-dock-hidden-content');
  multiBlurContent.classList.toggle('priv-share-dock-show-multi-blur-content');

  // hiding main dock buttons

  const blurAdjustmentBlock = document.getElementById(
    'priv-share-blur-adjustment-block'
  );

  const mainDockButtons = document.querySelectorAll(
    '.priv-share-dock-main > .priv-share-dock-item'
  );

  // revert the expanding animnation on main dock
  const mainDock = document.getElementsByClassName('priv-share-dock-main')[0];
  mainDock.classList.toggle('priv-share-dock-show-multi-blur-content');
  mainDock.classList.toggle('priv-share-dock-show-multi-blur-content-reverse');

  // const dock = document.getElementsByClassName('priv-share-dock')[0];
  // dock.style.alignItems = 'flex-end';

  setTimeout(function () {
    mainDockButtons.forEach((mainDockButton) => {
      mainDockButton.classList.toggle('priv-share-dock-item-hide');
    });
    blurAdjustmentBlock.classList.toggle('priv-share-dock-item-hide');
  }, 100);
};

const settingsOpeningAnimation = () => {
  const settingsContent = document.getElementById(
    'priv-share-settings-button-content'
  );

  // running the expanding animation on hidden content block
  settingsContent.classList.toggle('priv-share-dock-hidden-content');
  settingsContent.classList.toggle('priv-share-dock-show-settings-content');

  // hiding main dock buttons
  const blurAdjustmentBlock = document.getElementById(
    'priv-share-blur-adjustment-block'
  );
  blurAdjustmentBlock.classList.toggle('priv-share-dock-item-hide');

  const mainDockButtons = document.querySelectorAll(
    '.priv-share-dock-main > .priv-share-dock-item'
  );

  mainDockButtons.forEach((mainDockButton) => {
    mainDockButton.classList.toggle('priv-share-dock-item-hide');
  });

  // running the expanding animnation on main dock
  const mainDock = document.getElementsByClassName('priv-share-dock-main')[0];
  mainDock.classList.toggle('priv-share-dock-show-settings-content');
  mainDock.classList.remove('priv-share-dock-show-multi-blur-content-reverse');

  // const dock = document.getElementsByClassName('priv-share-dock')[0];
};

const settingsClosingAnimation = () => {
  const settingsContent = document.getElementById(
    'priv-share-settings-button-content'
  );

  // running the expanding animation on hidden content block
  settingsContent.classList.toggle('priv-share-dock-hidden-content');
  settingsContent.classList.toggle('priv-share-dock-show-settings-content');

  // hiding main dock buttons
  const blurAdjustmentBlock = document.getElementById(
    'priv-share-blur-adjustment-block'
  );

  const mainDockButtons = document.querySelectorAll(
    '.priv-share-dock-main > .priv-share-dock-item'
  );

  // revert the expanding animnation on main dock
  const mainDock = document.getElementsByClassName('priv-share-dock-main')[0];
  mainDock.classList.toggle('priv-share-dock-show-settings-content');
  mainDock.classList.toggle('priv-share-dock-show-multi-blur-content-reverse');

  // const dock = document.getElementsByClassName('priv-share-dock')[0];
  // dock.style.alignItems = 'flex-end';

  setTimeout(function () {
    mainDockButtons.forEach((mainDockButton) => {
      mainDockButton.classList.toggle('priv-share-dock-item-hide');
    });
    blurAdjustmentBlock.classList.toggle('priv-share-dock-item-hide');
  }, 100);
};

// ============================================

// const COMMON_SECURE_KEYWORDS = {};

const save = async (key, value) => {
  await chrome.storage.sync.set({ [key]: value });
  console.log('Settings saved');

  // localStorage.setItem(key, JSON.stringify(value));
};

const load = async (key) => {
  const value = await chrome.storage.sync.get([key]);
  console.log(value, typeof value);
  if (Object.keys(value).length === 0) {
    // return Object.keys(COMMON_SECURE_KEYWORDS);
    return [];
  }
  return value[key];

  // const value = localStorage.getItem(key);
  // try {
  //   return value && JSON.parse(value);
  // } catch (e) {
  //   console.warn(
  //     `⚠️ The ${key} value that is stored in localStorage is incorrect. Try to remove the value ${key} from localStorage and reload the page`
  //   );
  //   return undefined;
  // }
};

// ============================================

const addBlurItem = (text) => {
  const blurList = document.getElementById('priv-share-multi-blur-list');

  const li = document.createElement('li');
  li.textContent = text;
  li.setAttribute('data-text', text);
  let span = document.createElement('span');
  span.textContent = ' ❌';
  li.appendChild(span);

  span.addEventListener('click', (e) => {
    removeBlur(li);
  });

  // if (COMMON_SECURE_KEYWORDS[text]) {
  //   const label = document.createElement('span');
  //   label.className = 'blurLabel';
  //   label.innerText = DEFAULT_KEYWORDS[text];
  //   li.prepend(label);
  // }

  blurList.appendChild(li);
};

const addBlur = async () => {
  const blurInput = document.getElementById('priv-share-multi-blur-input');

  const text = blurInput.value;
  if (text) {
    addBlurItem(text);
    blurInput.value = '';
    const currentTexts = await load('blurTexts');
    currentTexts.push(text);
    await save('blurTexts', currentTexts);
    // textsToBlur = currentTexts; // TODO Bug, should I do = text only

    blurTextOrExpression(document.body, [text]);
  }
};

const blurTextOrExpression = (node, textsToBlur) => {
  // console.log(node, textsToBlur);
  if (node.nodeType === 3) {
    // Text node
    let modifiedText = node.nodeValue;
    if (modifiedText.trim() === '') return;
    textsToBlur.forEach((text) => {
      // const regex =  new RegExp(`/\b(?:${text})\b/i`);
      const regex = new RegExp(text, 'g');
      if (regex.test(modifiedText)) {
        // console.log(text, modifiedText,regex.test(modifiedText));
        modifiedText = modifiedText.replace(regex, '<blur>$&</blur>');
        // console.log(modifiedText)
      }
    });

    
    if (node.nodeValue !== modifiedText) {
      // console.log(modifiedText)
      const blurParentElement = document.createElement('blurParent');
      blurParentElement.innerHTML = modifiedText;
      node.parentNode.replaceChild(blurParentElement, node);
    }
  } else if (
    node.tagName !== 'BLUR' &&
    node.id !== 'priv-share-dock' &&
    node.nodeType === 1 &&
    node.childNodes
  ) {
    // Element node
    Array.from(node.childNodes).forEach((child) =>
      blurTextOrExpression(child, textsToBlur)
    );
  }
};

const removeBlur = async (elem) => {
  const blurList = document.getElementById('priv-share-multi-blur-list');

  const items = Array.from(blurList.querySelectorAll('li'));
  items.forEach(item => {
      if (item === elem) {
          blurList.removeChild(item);
      }
  });
  const text = (elem.getAttribute && elem.getAttribute('data-text'));

  let currentTexts = await load('blurTexts');
  currentTexts = currentTexts.filter(t => t !== text);
  await save('blurTexts', currentTexts);
  // textsToBlur = currentTexts;
  document.querySelectorAll('blur').forEach((node) => {
      if ((new RegExp(text, 'g')).test(node.innerText)) {
          node.parentNode.replaceChild(document.createTextNode(node.innerText), node);
      }
  });
}

const blurHighlightedSelection = () => {
  const selection = window.getSelection();
  const node = selection.anchorNode;
  const text = selection.toString();

  if (node.nodeType === 3) {
    // Text node
    let modifiedText = node.nodeValue;
    if (modifiedText.trim() === '') return;

    const regex = new RegExp(text, 'g');

    if (regex.test(modifiedText)) {
      modifiedText = modifiedText.replace(regex, '<blur>$&</blur>');
    }

    if (node.nodeValue !== modifiedText) {
      const blurParentElement = document.createElement('blurParent');
      blurParentElement.innerHTML = modifiedText;
      node.parentNode.replaceChild(blurParentElement, node);
    }
  }
};


const showDock = async () => {

  const dockHtml = `<div class="priv-share-dock-secondary">
    <button
      type="button"
      class="priv-share-button priv-share-dock-item priv-share-dock-item-circle"
      id="priv-share-save-button"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke-width="0" />
        <g
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18.172 1a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 23 5.828V20a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3zM4 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h1v-6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v6h1a1 1 0 0 0 1-1V6.828a2 2 0 0 0-.586-1.414l-1.828-1.828A2 2 0 0 0 17.172 3H17v2a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V3zm13 18v-6a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6zM9 3h6v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"
          fill="#fff"
        />
      </svg>
    </button>
    <span class="priv-share-tooltip-secondary">Save Mode</span>
  </div>
  <div class="priv-share-dock-main">
    <div
      class="priv-share-dock-hidden-content"
      id="priv-share-multi-blur-button-content"
    >
      <div class="priv-share-input-wrapper" id="priv-share-multi-blur-input-wrapper">
        <input
          type="text"
          class="priv-share-input"
          id="priv-share-multi-blur-input"
          placeholder="Keyword to Blur (Regular expressions also supported)"
        />
      </div>
      <button
        id="priv-share-add-blur"
        class="priv-share-button priv-share-internal-button"
      >
        Blur It!
      </button>
      <!-- <hr /> -->
      <!-- <div id="priv-share-multi-blur-list-heading">Blurred Keywords:</div> -->
      <!-- <div id="blurActions">
        <button id="removeBlur">Remove</button>
        <button id="resetBlur">Reset</button>
      </div> -->
      <div style="overflow: scroll;">
        <ul id="priv-share-multi-blur-list">
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
        <li>Vestibulum auctor dapibus neque.</li>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
        <li>Vestibulum auctor dapibus neque.</li>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
        <li>Vestibulum auctor dapibus neque.</li>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
        <li>Vestibulum auctor dapibus neque.</li>
        </ul>
      </div>
      <button
        id="priv-share-multi-blur-back-button"
        class="priv-share-button priv-share-internal-button"
      >
        <svg
          aria-hidden="true"
          data-prefix="fas"
          data-icon="chevron-left"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 26.667"
          width="20"
          height="20"
          style="margin-right: 10px"
        >
          <path
            fill="#fff"
            d="M2.156 12.156c-0.651 0.651 -0.651 1.708 0 2.359l10 10c0.651 0.651 1.708 0.651 2.359 0s0.651 -1.708 0 -2.359L5.693 13.333 14.51 4.51c0.651 -0.651 0.651 -1.708 0 -2.359s-1.708 -0.651 -2.359 0l-10 10z"
          />
        </svg>
        Back
      </button>
    </div>
    <button
      id="priv-share-multi-blur-button"
      class="priv-share-button priv-share-dock-item"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 192 192"
        xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
        fill="none"
        stroke="#fff"
      >
        <g stroke-width="0" />
        <g
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="m104.175 90.97-4.252 38.384 38.383-4.252L247.923 15.427V2.497L226.78-18.646h-12.93zm98.164-96.96 31.671 31.67"
          style="
            fill: none;
            fill-opacity: 1;
            fill-rule: nonzero;
            stroke: #fff;
            stroke-width: 12;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: none;
            stroke-opacity: 1;
          "
          transform="translate(-77.923 40.646)"
        />
        <path
          d="m195.656 33.271-52.882 52.882"
          style="
            fill: none;
            fill-opacity: 1;
            fill-rule: nonzero;
            stroke: #fff;
            stroke-width: 12;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-miterlimit: 5;
            stroke-dasharray: none;
            stroke-opacity: 1;
          "
          transform="translate(-77.923 40.646)"
        />
      </svg>
      <span
        class="priv-share-tooltip-main"
        style="left: -20px"
        >Multi Blur</span
      >
    </button>
    <button id="priv-share-highlight-blur-button" class="priv-share-button priv-share-dock-item">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke-width="0" />
        <g
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="m6.75 6.799-.375.65zm-.549-.549-.65.375zm11.598 0 .65.375zm-.549.549.375.65zm0-4.598.375-.65zm.549.549.65-.375zM6.75 2.201l-.375-.65zm-.549.549-.65-.375zm7.506 18.957-.53-.53zm0-7.414-.53.53zm-3.414 0-.53-.53zm0 7.414.53-.53zm5.114-10.718-.112-.742zm4.076-.612-.111-.741zm2.378-4.61.698-.274zM20.733 4.64l-.275.698zm.205 5.405-.351-.663zm.948-1.1.707.25zm-9.401 2.973-.569-.49zM12.005 14v.75h.737l.013-.738zM5.5 3.75a.75.75 0 0 0 0 1.5zm3-1h7v-1.5h-7zm7 3.5h-7v1.5h7zm-7 0c-.481 0-.792 0-1.027-.022-.225-.02-.307-.055-.348-.078l-.75 1.299c.307.177.633.243.962.273.32.029.71.028 1.163.028zM5.25 4.5c0 .454 0 .844.028 1.163.03.329.096.655.273.962l1.3-.75c-.024-.04-.059-.123-.079-.348A13 13 0 0 1 6.75 4.5zm1.875 1.65a.75.75 0 0 1-.275-.275l-1.299.75c.198.342.482.626.824.824zM17.25 4.5c0 .481 0 .792-.022 1.027-.02.225-.055.307-.079.348l1.3.75c.177-.307.243-.633.273-.962.029-.32.028-.71.028-1.163zM15.5 7.75c.454 0 .844 0 1.163-.028.329-.03.655-.096.962-.273l-.75-1.3c-.04.024-.123.059-.348.079a13 13 0 0 1-1.027.022zm1.65-1.875a.75.75 0 0 1-.275.275l.75 1.299a2.25 2.25 0 0 0 .824-.824zM15.5 2.75c.481 0 .792 0 1.027.022.225.02.307.055.348.078l.75-1.299c-.307-.177-.633-.243-.962-.273-.32-.029-.71-.028-1.163-.028zm3.25 1.75c0-.454 0-.844-.028-1.163-.03-.329-.096-.655-.273-.962l-1.3.75c.024.04.058.123.079.348.021.235.022.546.022 1.027zm-1.875-1.65a.75.75 0 0 1 .274.275l1.3-.75a2.25 2.25 0 0 0-.824-.824zM8.5 1.25c-.454 0-.844 0-1.163.028-.329.03-.655.096-.962.273l.75 1.3c.04-.024.123-.059.348-.079.235-.021.546-.022 1.027-.022zM6.75 4.5c0-.481 0-.792.022-1.027.02-.225.055-.307.078-.348l-1.299-.75c-.177.307-.243.633-.273.962-.029.32-.028.71-.028 1.163zm-.375-2.949a2.25 2.25 0 0 0-.824.824l1.3.75a.75.75 0 0 1 .274-.275zM10.75 20v-4h-1.5v4zm2.5-4v4h1.5v-4zm0 4c0 .493-.002.787-.03.997a.7.7 0 0 1-.043.18l1.06 1.06c.31-.309.422-.684.47-1.04.045-.334.043-.747.043-1.197zM12 22.75c.45 0 .863.002 1.197-.043.356-.048.731-.16 1.04-.47l-1.06-1.06-.003.001-.01.005a.7.7 0 0 1-.167.037c-.21.028-.504.03-.997.03zm0-8c.493 0 .787.002.997.03a.7.7 0 0 1 .18.043l1.06-1.06c-.309-.31-.684-.422-1.04-.47-.334-.045-.747-.043-1.197-.043zM14.75 16c0-.45.002-.863-.043-1.197-.048-.356-.16-.731-.47-1.04l-1.06 1.06.001.003.005.01c.009.022.024.07.037.167.028.21.03.504.03.997zm-4 0c0-.493.002-.787.03-.997a.7.7 0 0 1 .043-.18l-1.06-1.06c-.31.309-.422.684-.47 1.04-.045.334-.043.747-.043 1.197zM12 13.25c-.45 0-.863-.002-1.197.043-.356.048-.731.16-1.04.47l1.06 1.06.003-.001.01-.005a.7.7 0 0 1 .167-.037c.21-.028.504-.03.997-.03zM9.25 20c0 .45-.002.863.043 1.197.048.356.16.731.47 1.04l1.06-1.06-.001-.003-.005-.01a.7.7 0 0 1-.037-.167c-.028-.21-.03-.504-.03-.997zM12 21.25c-.493 0-.787-.002-.997-.03a.7.7 0 0 1-.18-.043l-1.06 1.06c.309.31.684.422 1.04.47.334.045.747.043 1.197.043zm3.518-9.52 4.076-.61-.222-1.484-4.077.611zm3.527-7.98H18v1.5h1.045zm3.705 3.705c0-.435 0-.797-.019-1.094a2.8 2.8 0 0 0-.172-.868l-1.396.55c.03.073.056.186.071.416.016.236.016.541.016.996zM19.045 5.25c.455 0 .76 0 .996.016.23.015.343.042.417.07l.55-1.395a2.8 2.8 0 0 0-.87-.172c-.296-.02-.658-.019-1.093-.019zm3.514.243a2.75 2.75 0 0 0-1.552-1.552l-.55 1.396c.324.127.58.382.706.705zm-2.965 5.626c.71-.106 1.252-.177 1.696-.413l-.703-1.325c-.162.086-.387.13-1.215.255zm1.656-3.664c0 .837-.01 1.067-.071 1.239l1.414.5c.168-.475.157-1.022.157-1.739zm.04 3.251a2.75 2.75 0 0 0 1.303-1.513l-1.414-.5a1.25 1.25 0 0 1-.592.688zm-5.995-.459c-.793.12-1.457.218-1.98.365-.543.152-1.024.38-1.399.816l1.137.979c.11-.127.277-.242.668-.351.41-.116.965-.2 1.797-.325zm-2.54 3.765c.017-1.065.116-1.395.298-1.605l-1.137-.98c-.58.675-.644 1.552-.661 2.56zM12 14.75h.005v-1.5H12zm-6-11h-.5v1.5H6z"
          fill="#fff"
        />
      </svg>
      <span
        class="priv-share-tooltip-main"
        style="left: 25px"
        >Highlight Blur</span
      >
    </button>
    <button class="priv-share-button priv-share-dock-item">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#fff"
        width="18"
        height="18"
      >
        <g stroke-width="0" />
        <g
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.417 6.417 5.042 5.042M13.75 6.417l1.375 -1.375m-10.083 10.083L6.417 13.75m3.667 -9.167V2.75m-5.5 7.333H2.75m12.98 5.49 3.568 -1.396a0.458 0.458 0 0 0 0 -0.853l-8.574 -3.35a0.458 0.458 0 0 0 -0.593 0.594l3.349 8.573a0.458 0.458 0 0 0 0.853 0z"
          stroke-width="1.8333333333333333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span
        class="priv-share-tooltip-main"
        style="left: 100px"
        >Click Blur</span
      >
    </button>
    <button class="priv-share-button priv-share-dock-item">
      <svg
        width="18"
        height="18"
        fill="#fff"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#fff"
        stroke-width="0"
      >
        <g />
        <g
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 6H8V2H6v4H2v2h4v4h2V8h4zm18 4V4h-6v2h-8v2h8v2h2v14h-2v2H10v-2H8v-8H6v8H4v6h6v-2h14v2h6v-6h-2V10ZM8 28H6v-2h2Zm20 0h-2v-2h2ZM26 6h2v2h-2Z"
          stroke="none"
        />
        <path
          data-name="&lt;Transparent Rectangle&gt;"
          style="fill: none"
          d="M0 0h32v32H0z"
          stroke="none"
        />
      </svg>
      <span
        class="priv-share-tooltip-main"
        style="left: 165px"
        >Area Blur</span
      >
    </button>
    <div
      class="priv-share-dock-hidden-content"
      id="priv-share-settings-button-content"
    >
      <label
        id="priv-share-license-key-label"
        for="license-key"
        >License Key 🔒</label
      >
      <div class="priv-share-input-wrapper">
        <input
          type="text"
          class="priv-share-input"
          name="license-key"
          placeholder="License key"
        />
      </div>
      <button class="priv-share-button priv-share-internal-button">Enable It!</button>
      <!-- <hr /> -->
      <label id="priv-share-backup-label">Backup & Sync ⚙️</label>
      <button
        class="priv-share-button priv-share-internal-button"
        id="priv-share-backup-button"
      >
        <svg
          width="20.5"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style="margin-right: 10px"
        >
          <path
            d="M12 3v13m0 0 4-4.375M12 16l-4-4.375M15 21H9c-2.828 0-4.243 0-5.121-.879C3 19.243 3 17.828 3 15m18 0c0 2.828 0 4.243-.879 5.121-.3.3-.662.498-1.121.628"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Backup
      </button>
      <div id="priv-share-sync-content">
        <div
          id="priv-share-upload-content"
          class="priv-share-internal-button"
        >
          <input
            type="file"
            name="priv-share-backup-upload-button[]"
            id="priv-share-backup-upload-button"
            data-multiple-caption="{count} files selected"
            multiple=""
          />
          <label for="priv-share-backup-upload-button"
            ><span>Choose Backup file…</span></label
          >
        </div>
        <button
          class="priv-share-button priv-share-internal-button"
          id="priv-share-sync-button"
        >
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            style="margin-right: 10px"
          >
            <g stroke-width="0" />
            <g
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.5 17.5H7.5c-2.357 0 -3.536 0 -4.268 -0.733C2.5 16.036 2.5 14.857 2.5 12.5m15 0c0 2.357 0 3.536 -0.733 4.268 -0.25 0.25 -0.552 0.415 -0.934 0.523M10 13.333V2.5m0 0 3.333 3.646M10 2.5 6.667 6.146"
              stroke="#fff"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Sync
        </button>
      </div>
      <!-- <hr /> -->
      <button
        id="priv-share-settings-back-button"
        class="priv-share-button priv-share-internal-button"
      >
        <svg
          aria-hidden="true"
          data-prefix="fas"
          data-icon="chevron-left"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 26.667"
          width="20"
          height="20"
          style="margin-right: 10px"
        >
          <path
            fill="#fff"
            d="M2.156 12.156c-0.651 0.651 -0.651 1.708 0 2.359l10 10c0.651 0.651 1.708 0.651 2.359 0s0.651 -1.708 0 -2.359L5.693 13.333 14.51 4.51c0.651 -0.651 0.651 -1.708 0 -2.359s-1.708 -0.651 -2.359 0l-10 10z"
          />
        </svg>
        Back
      </button>
    </div>
    <div id="priv-share-blur-adjustment-block">
      <button id="priv-share-reduce-blur-button" class="priv-share-button">-</button>
      <div id="priv-share-blur-count">10</div>
      <button id="priv-share-increase-blur-button" class="priv-share-button">+</button>
    </div>
    <button
      class="priv-share-button priv-share-dock-item"
      id="priv-share-multi-settings-button"
    >
      <span
        class="priv-share-tooltip-main"
        style="left: 343px"
        >Settings</span
      >
      <svg
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
      >
        <g stroke-width="0" />
        <g
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill="#fff"
          d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357 357 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a352 352 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357 357 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294 294 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293 293 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294 294 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288 288 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293 293 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a288 288 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384m0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256"
        />
      </svg>
    </button>
  </div>
  <div class="priv-share-dock-secondary">
    <button class="priv-share-button priv-share-dock-item priv-share-dock-item-circle">
      <svg
        width="20"
        height="20"
        fill="#fff"
        viewBox="-2 0 19 19"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#fff"
        stroke-width="0"
      >
        <g />
        <g
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.498 17.1a7 7 0 0 1-.98-.068 7.5 7.5 0 0 1-1.795-.483 7.26 7.26 0 0 1-3.028-2.332A7.2 7.2 0 0 1 .73 12.52a7.3 7.3 0 0 1 .972-7.128 7.2 7.2 0 0 1 1.387-1.385 1.03 1.03 0 0 1 1.247 1.638 5.2 5.2 0 0 0-.993.989 5.3 5.3 0 0 0-.678 1.181 5.2 5.2 0 0 0-.348 1.292 5.2 5.2 0 0 0 .326 2.653 5 5 0 0 0 .69 1.212 5.2 5.2 0 0 0 .992.996 5.3 5.3 0 0 0 1.178.677 5.4 5.4 0 0 0 1.297.35 5 5 0 0 0 1.332.008 5.4 5.4 0 0 0 1.32-.343 5.3 5.3 0 0 0 2.211-1.682 5.2 5.2 0 0 0 1.02-2.465 5.2 5.2 0 0 0 .01-1.336 5.3 5.3 0 0 0-.343-1.318 5.2 5.2 0 0 0-.695-1.222 5 5 0 0 0-.987-.989 1.03 1.03 0 1 1 1.24-1.643 7.2 7.2 0 0 1 1.384 1.386 7.3 7.3 0 0 1 .97 1.706 7.4 7.4 0 0 1 .473 1.827 7.296 7.296 0 0 1-4.522 7.65 7.5 7.5 0 0 1-1.825.471 7 7 0 0 1-.89.056zM7.5 9.613a1.03 1.03 0 0 1-1.03-1.029V2.522a1.03 1.03 0 0 1 2.06 0v6.062a1.03 1.03 0 0 1-1.03 1.03z"
          stroke="none"
        />
      </svg>
    </button>
    <span class="priv-share-tooltip-secondary">Close PrivShare</span>
  </div>
  </div>
  <div
  id="dottedLines"
  class="hide"
  >
  <div
    class="dottedLine"
    id="dottedLineTop"
  ></div>
  <div
    class="dottedLine"
    id="dottedLineBottom"
  ></div>
  <div
    class="dottedLine"
    id="dottedLineLeft"
  ></div>
  <div
    class="dottedLine"
    id="dottedLineRight"
  ></div>`;

    const dockDiv = document.createElement('div');
    dockDiv.id = 'priv-share-dock';
    dockDiv.innerHTML = dockHtml;
    document.querySelector('body').appendChild(dockDiv);

    // ======================

    const multiBlurButton = document.getElementById('priv-share-multi-blur-button');
    // console.log(multiBlurButton)
    multiBlurButton.addEventListener('click', multiBlurOpenAnimation);

    const multiBlurBackButton = document.getElementById(
      'priv-share-multi-blur-back-button'
    );
    multiBlurBackButton.addEventListener('click', multiBlurClosingAnimation);

    const settingsButton = document.getElementById(
      'priv-share-multi-settings-button'
    );
    settingsButton.addEventListener('click', settingsOpeningAnimation);

    const settingsBackButton = document.getElementById(
      'priv-share-settings-back-button'
    );

    settingsBackButton.addEventListener('click', settingsClosingAnimation);

    // ======================

  const addBlurButton = document.getElementById('priv-share-add-blur');
  addBlurButton.addEventListener('click', addBlur);

  const highlightBlurButton =  document.getElementById('priv-share-highlight-blur-button');
  highlightBlurButton.addEventListener('click', blurHighlightedSelection);


}

showDock();
