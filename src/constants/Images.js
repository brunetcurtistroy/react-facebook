import inspectionVariationOP_IMG from "assets/img/検査変動-OP.png";
import courseIMG from "assets/img/検査変動-ｺｰｽ.png";
import deletedIMG from "assets/img/検査変動-削除.png";
import additionIMG from "assets/img/検査変動-追加.png";
import notImplementedIMG from "assets/img/検査変動-未実施.png";
import status_input_lock from "assets/img/status_input_lock.png";
import status_input_lock_disabled from "assets/img/status_input_lock_disabled.png";
import man from 'assets/img/性別-男性.png';
import woman from 'assets/img/性別-女性.png';

const Images = {
    '10': courseIMG,
    '20': additionIMG,
    '30': deletedIMG,
    '40': inspectionVariationOP_IMG,
    '50': additionIMG,
    '60': deletedIMG,
    '70': notImplementedIMG,
    '性別-男性.png': man,
    '性別-女性.png': woman,
    'ステータス-入力-ロック.png': status_input_lock,
    '状態-入力-アンロック.png': status_input_lock_disabled,
    man,
    woman,
}

const GetImage = (imgKey) => {
    return Images[imgKey];
}

export default GetImage;