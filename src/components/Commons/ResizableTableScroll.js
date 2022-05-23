/**
 * Realize automatic adjustment of visual height of antd <Table />
 * @param {*} extraHeight Any bottom height
 * @param {*} id <Table /> id
 * @return
 */
const resizableTableScroll = (extraHeight = undefined, id = null) => {
  if (typeof extraHeight == "undefined") {
    //   Default bottom 50
    extraHeight = 50
  }
  let tHeader = null
  if (id) {
    tHeader = document.getElementById(id) ? document.getElementById(id).getElementsByClassName("ant-table-thead")[0] : null
  } else {
    tHeader = document.getElementsByClassName("ant-table-thead")[0]
  }
  // The distance from the table content to the top
  let tHeaderBottom = 0
  if (tHeader) {
    tHeaderBottom = tHeader.getBoundingClientRect().bottom
  }
  // Form height - The height of the top of the table content - The height of the bottom of the table content 
  // let height = document.body.clientHeight - tHeaderBottom - extraHeight
  let height = `calc(100vh - ${tHeaderBottom + extraHeight}px)`

  return height
}
export default resizableTableScroll
