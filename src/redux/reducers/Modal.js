import {
  PRESENT_MODAL,
  HIDE_MODAL,
  CLEAR_MODAL,
  RESET_STORE,
} from '../actions/constant/ActionTypes';

const INITIAL_STATE = {
  presentModal: false,
  modalTitle: 'NA',
  modalMessage: 'NA',
  cancelButtonText: 'Cancel',
  showCancelButton: 'true',
  okButtonText: 'Ok',
  shouldLogout: false,
  shouldNavigate: false,
  fingerprint: false,
  navigation: '',
  navigateTo: '',
  modalBottomMessage: '',
  modalImage: '',
  shouldCallback: null,
  shouldCallback_1: null,
  shouldRunFunction: false,
  functionHandler: '',
  functionHandler_1: '',
  imagePath: null,
};

const ModalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRESENT_MODAL:
      return {
        ...state,
        presentModal: true,
        modalTitle: action.payload.title ? action.payload.title : 'NA',
        modalMessage: action.payload.message ? action.payload.message : 'NA',
        showCancelButton:
          action.payload.showCancelButton != ''
            ? action.payload.showCancelButton
            : 'true',
        shouldLogout: action.payload.shouldLogout
          ? action.payload.shouldLogout
          : false,
        shouldNavigate: action.payload.shouldNavigate
          ? action.payload.shouldNavigate
          : false,
        fingerprint: action.payload.fingerprint
          ? action.payload.fingerprint
          : false,
        navigation:
          action.payload.navigation != '' ? action.payload.navigation : '',
        navigateTo:
          action.payload.navigateTo != '' ? action.payload.navigateTo : '',
        modalBottomMessage:
          action.payload.modalBottomMessage != ''
            ? action.payload.modalBottomMessage
            : '',
        modalImage:
          action.payload.modalImage != '' ? action.payload.modalImage : '',
        shouldCallback:
          action.payload.shouldCallback != null
            ? action.payload.shouldCallback
            : null,
        shouldCallback_1:
          action.payload.shouldCallback_1 != null
            ? action.payload.shouldCallback_1
            : null,
        shouldRunFunction: action.payload.shouldRunFunction
          ? action.payload.shouldRunFunction
          : false,
        functionHandler:
          action.payload.functionHandler != ''
            ? action.payload.functionHandler
            : '',
        functionHandler_1:
          action.payload.functionHandler_1 != ''
            ? action.payload.functionHandler_1
            : '',
        okButtonText:
          action.payload.okButtonText != ''
            ? action.payload.okButtonText
            : 'Ok',
        cancelButtonText:
          action.payload.cancelButtonText != ''
            ? action.payload.cancelButtonText
            : 'Cancel',
        imagePath:
          action.payload.imagePath != '' ? action.payload.imagePath : null,
      };

    case HIDE_MODAL:
      return {
        ...state,
        presentModal: false,
      };

    case CLEAR_MODAL:
      return {
        ...state,
        presentModal: false,
        modalTitle: 'NA',
        modalMessage: 'NA',
        cancelButtonText: 'Cancel',
        showCancelButton: 'true',
        okButtonText: 'Ok',
        shouldLogout: false,
        shouldNavigate: false,
        fingerprint: false,
        navigation: '',
        navigateTo: '',
        modalBottomMessage: '',
        modalImage: '',
        shouldCallback: null,
        shouldCallback_1: null,
        shouldRunFunction: false,
        functionHandler: '',
        functionHandler_1: '',
        imagePath: null,
      };

    case RESET_STORE:
      return {
        ...state,
        presentModal: false,
        modalTitle: 'NA',
        modalMessage: 'NA',
        cancelButtonText: 'Cancel',
        showCancelButton: 'true',
        okButtonText: 'Ok',
        shouldLogout: false,
        shouldNavigate: false,
        fingerprint: false,
        navigation: '',
        navigateTo: '',
        modalBottomMessage: '',
        modalImage: '',
        shouldCallback: null,
        shouldCallback_1: null,
        shouldRunFunction: false,
        functionHandler: '',
        functionHandler_1: '',
        imagePath: null,
      };

    default:
      return state;
  }
};

export default ModalReducer;
