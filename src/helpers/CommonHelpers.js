export function number_format(number) {
  return (new Intl.NumberFormat()).format(number);
}

function PrintHTML(htmlTxt, preview) {
  // Fixes dual-screen position                             Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;
  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;
  const systemZoom = width / window.screen.availWidth;
  const w = width;
  const h = height;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft
  const top = (height - h) / 2 / systemZoom + dualScreenTop
  const newWindow = window.open('', '', `
      scrollbars=yes,
      width=${w / systemZoom},
      height=${h / systemZoom},
      top=${top},
      left=${left}
  `);
  const newDoc = newWindow.document;
  newDoc.write(htmlTxt);
  // window.onclose = newWindow.close;
  newWindow.focus();
  if (!preview) {
    newWindow.print();
    newWindow.close();
  }
}

export async function download_file(axiosResponse, preview = false) {
  let headerLine = axiosResponse.headers['Content-Disposition'] || axiosResponse.headers['content-disposition'];
  if (!headerLine) {
    return;
  }
  const fnameArr = headerLine.split(';');
  let filename = fnameArr[fnameArr.length - 1].split('=')[1].replace('"', '').replace('"', '');
  // console.log(fnameArr);
  const utf8Name = "utf-8''";
  if (filename.indexOf(utf8Name) !== -1) {
    filename = decodeURI(filename.replace(utf8Name, ''));
  }

  if (filename.indexOf('.html') !== -1) {
    const dataText = axiosResponse.data.text ? (await axiosResponse.data.text()) : axiosResponse.data;
    PrintHTML(dataText, preview);
  } else {
    const downloadUrl = window.URL.createObjectURL(new Blob([axiosResponse.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', filename); //any other extension
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

export function basename(path) {
  return path?.split(/[\\/]/).pop();
}

export const Regex = (value, regexString) => {
  const regex = new RegExp(regexString);
  return regex.test(value) // return true or false
}
