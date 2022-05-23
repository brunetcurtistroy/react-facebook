import OcrCaptureStartUpService from "services/CooperationRelated/OcrCaptureStartUp/OcrCaptureStartUpService";

const OcrCaptureStartUpAction = {
  getScreenData() {
    return OcrCaptureStartUpService.getScreenData()
  },

  ReadButton(data) {
    return OcrCaptureStartUpService.ReadButton(data)
  },

  batchDeleteBefore() {
    return OcrCaptureStartUpService.batchDeleteBefore()
  },

  batchDeleteAfter() {
    return OcrCaptureStartUpService.batchDeleteAfter()
  },

  getInfoProcess(data) {
    return OcrCaptureStartUpService.getInfoProcess(data)
  }
}

export default OcrCaptureStartUpAction;