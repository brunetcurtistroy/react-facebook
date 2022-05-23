export const VenusDateValidation = (date) => {
  let dateReturn = func(date);
  // console.log("VenusDateValidation: ", date, dateReturn);
  return dateReturn;
};
var Li_Chadata,
  Lo_Data,
  y,
  m,
  d,
  nowdate,
  fail_date,
  sl_index,
  dt_index,
  hi_index,
  wareki_dgt,
  Li_Chadata_strCount,
  chkdate;
var sl_index_m, dt_index_m, hi_index_m, sl_index_d, index_d, hi_index_d;

const func = (date) => {
  //テキストボックス読み取り
  Li_Chadata = date;
  Lo_Data = "";
  chkdate = "";
  wareki_dgt = 0;

  Li_Chadata_strCount = Li_Chadata.length;

  //入力無しの場合
  // if (!Li_Chadata) {
  //   window.alert('日付を入力してください');
  // }

  let format_A = /^\d$/;
  let format_B = /^\d{2}$/;
  let format_A_result = Li_Chadata.match(format_A); //5
  let format_B_result = Li_Chadata.match(format_B); //13

  if (format_A_result != null || format_B_result != null) {
    //1 or 2桁入力の場合日付2桁化
    //let Li_Chadata = "12"; //Debug 入力データ
    let Li_Chadatak = ("0" + Li_Chadata).slice(-2);
    nowdate = new Date();
    y = nowdate.getFullYear();
    m = ("0" + (nowdate.getMonth() + 1)).slice(-2);
    d = Li_Chadatak;
    Lo_Data = y + "/" + m + "/" + d;
  }

  let format_C = /^\d{3}$/;
  let format_D = /^\d[\/|\.|\-]\d{2}/;
  let format_C_result = Li_Chadata.match(format_C);
  let format_D_result = Li_Chadata.match(format_D);

  if (format_C_result != null || format_D_result != null) {
    // .,-,/除去
    Li_Chadata = Li_Chadata.replace(/\//g, "");
    Li_Chadata = Li_Chadata.replace(/\./g, "");
    Li_Chadata = Li_Chadata.replace(/\-/g, "");

    nowdate = new Date();
    y = nowdate.getFullYear();
    let mtemp = Li_Chadata.substr(0, 1);
    m = "0" + mtemp;
    d = Li_Chadata.substr(1, 2);
    Lo_Data = y + "/" + m + "/" + d;
  }

  let format_E = /^\d{4}$/;
  let format_F = /^\d{2}[\/|\.|\-]\d{2}$/;
  let format_E_result = Li_Chadata.match(format_E);
  let format_F_result = Li_Chadata.match(format_F);

  if (format_E_result != null || format_F_result != null) {
    // .,-,/除去
    Li_Chadata = Li_Chadata.replace(/\//g, "");
    Li_Chadata = Li_Chadata.replace(/\./g, "");
    Li_Chadata = Li_Chadata.replace(/\-/g, "");

    nowdate = new Date();
    y = nowdate.getFullYear();
    m = Li_Chadata.substr(0, 2);
    d = Li_Chadata.substr(2, 2);
    Lo_Data = y + "/" + m + "/" + d;
  }

  let format_G = /^\d{2}[\/|\.|\-]\d{3}$/;

  let format_G_result = Li_Chadata.match(format_G);

  if (format_G_result != null) {
    // .,-,/除去
    Li_Chadata = Li_Chadata.replace(/\//g, "");
    Li_Chadata = Li_Chadata.replace(/\./g, "");
    Li_Chadata = Li_Chadata.replace(/\-/g, "");

    let ytemp = Li_Chadata.substr(0, 2);
    if (ytemp >= 40) {
      y = "19" + ytemp.toString();
    } else {
      y = "20" + ytemp.toString();
    }
    let mtemp = Li_Chadata.substr(2, 1);
    m = "0" + mtemp;
    d = Li_Chadata.substr(3, 2);
    Lo_Data = y + "/" + m + "/" + d;
  }

  let format_H = /^\d{6}$/;
  let format_I = /^\d{2}[\/|\.|\-]\d{4}$/;
  let format_H_result = Li_Chadata.match(format_H);
  let format_I_result = Li_Chadata.match(format_I);

  if (format_H_result != null || format_I_result != null) {
    // .,-,/除去
    Li_Chadata = Li_Chadata.replace(/\//g, "");
    Li_Chadata = Li_Chadata.replace(/\./g, "");
    Li_Chadata = Li_Chadata.replace(/\-/g, "");

    let ytemp = Li_Chadata.substr(0, 2);
    if (ytemp >= 40) {
      y = "19" + ytemp.toString();
    } else {
      y = "20" + ytemp.toString();
    }
    m = Li_Chadata.substr(2, 2);
    d = Li_Chadata.substr(4, 2);
    Lo_Data = y + "/" + m + "/" + d;
  }

  let format_J = /^\d{2}[\/,\.,\-]\d{1,2}[\/,\.,\-]\d{1,2}$/;
  let format_J_result = Li_Chadata.match(format_J);

  if (format_J_result != null) {
    let ytemp = Li_Chadata.substr(0, 2);
    if (ytemp >= 40) {
      y = "19" + ytemp.toString();
    } else {
      y = "20" + ytemp.toString();
    }

    if (Li_Chadata_strCount == 8) {
      //21/12/13確定
      m = Li_Chadata.substr(3, 2);
      d = Li_Chadata.substr(6, 2);
    }
    if (Li_Chadata_strCount == 7) {
      //21/08/1 or 21/8/10
      sl_index_m = Li_Chadata.indexOf("/", 3);
      dt_index_m = Li_Chadata.indexOf("-", 3);
      hi_index_m = Li_Chadata.indexOf(".", 3);
      if (sl_index_m == 4 || dt_index_m == 4 || hi_index_m == 4) {
        //日付 1桁確定 //21/8/22
        m = "0" + Li_Chadata.substr(3, 1);
        d = Li_Chadata.substr(5, 2);
      }
      if (sl_index_m == 5 || dt_index_m == 5 || hi_index_m == 5) {
        //日付 2桁確定 //21/01/2
        m = Li_Chadata.substr(3, 2);
        d = "0" + Li_Chadata.substr(6, 1);
      }
    }
    if (Li_Chadata_strCount == 6) {
      //21/7/4確定
      m = "0" + Li_Chadata.substr(3, 1);
      d = "0" + Li_Chadata.substr(5, 1);
    }
    Lo_Data = y + "/" + m + "/" + d;
  }

  let format_K = /^\d{4}[\/,\.,\-]\d{1,2}[\/,\.,\-]\d{1,2}$/;
  let format_K_result = Li_Chadata.match(format_K);

  if (format_K_result != null) {
    if (Li_Chadata_strCount == 10) {
      //2021/12/13確定
      y = Li_Chadata.substr(0, 4);
      m = Li_Chadata.substr(5, 2);
      d = Li_Chadata.substr(8, 2);
    }
    if (Li_Chadata_strCount == 9) {
      //2021/1/13 or 2021/12/1
      y = Li_Chadata.substr(0, 4);
      sl_index_m = Li_Chadata.indexOf("/", 5);
      dt_index_m = Li_Chadata.indexOf("-", 5);
      hi_index_m = Li_Chadata.indexOf(".", 5);
      if (sl_index_m == 6 || dt_index_m == 6 || hi_index_m == 6) {
        //日付 1桁確定 //2021/1/13
        m = "0" + Li_Chadata.substr(5, 1);
        d = Li_Chadata.substr(7, 2);
      }
      if (sl_index_m == 7 || dt_index_m == 7 || hi_index_m == 7) {
        //日付 2桁確定 //2021/12/1
        m = Li_Chadata.substr(5, 2);
        d = "0" + Li_Chadata.substr(8, 1);
      }
    }
    if (Li_Chadata_strCount == 8) {
      //2021/8.1 確定
      y = Li_Chadata.substr(0, 4);
      m = "0" + Li_Chadata.substr(5, 1);
      d = "0" + Li_Chadata.substr(7, 1);
    }
    Lo_Data = y + "/" + m + "/" + d;
  }

  //和暦解析
  let wareki_format_A =
    /^[M|m|T|t|S|s|H|h|R|r]\d{1,2}[\/,\.,\-]\d{1,2}[\/,\.,\-]\d{1,2}$/;
  let wareki_format_A_result = Li_Chadata.match(wareki_format_A);

  if (wareki_format_A_result != null) {
    //和暦の桁を抽出
    sl_index = Li_Chadata.indexOf("/");
    dt_index = Li_Chadata.indexOf("-");
    hi_index = Li_Chadata.indexOf(".");

    if (Li_Chadata_strCount == 9) {
      //H05/12/13確定
      wareki_dgt = 1;
      WaretkitoSeireki(Li_Chadata); //y = 1993
      m = Li_Chadata.substr(4, 2);
      d = Li_Chadata.substr(7, 2);
    }

    if (Li_Chadata_strCount == 8) {
      // H5.12-31 or H05.12-1 or H05.8-10
      if (sl_index == 2 || dt_index == 2 || hi_index == 2) {
        //H0 R2 年号1桁確定   //H5.12-31 が確定する
        wareki_dgt = 0;
        WaretkitoSeireki(Li_Chadata); //y = 1993
        m = Li_Chadata.substr(3, 2);
        d = Li_Chadata.substr(6, 2);
      }
      if (sl_index == 3 || dt_index == 3 || hi_index == 3) {
        //H05.12-1 or H05.8-10 年号2桁確定
        wareki_dgt = 1;
        WaretkitoSeireki(Li_Chadata); //y = 1993
        sl_index_m = Li_Chadata.indexOf("/", 3);
        dt_index_m = Li_Chadata.indexOf("-", 3);
        hi_index_m = Li_Chadata.indexOf(".", 3);
        if (sl_index_m == 5 || dt_index_m == 5 || hi_index_m == 5) {
          //月1桁確定 日付 2桁確定 // H05.8-10
          m = "0" + Li_Chadata.substr(4, 1);
          d = Li_Chadata.substr(6, 2);
        }
        if (sl_index_m == 6 || dt_index_m == 6 || hi_index_m == 6) {
          //月2桁確定 日付 1桁確定 //H05.12-1
          m = Li_Chadata.substr(4, 2);
          d = "0" + Li_Chadata.substr(7, 1);
        }
      }
    }
    if (Li_Chadata_strCount == 7) {
      //H0/2/01 or H0/02/1 or H00/2/1
      if (sl_index == 2 || dt_index == 2 || hi_index == 2) {
        //H0/2/01 or H0/02/1 が確定  年号1桁確定
        wareki_dgt = 0;
        WaretkitoSeireki(Li_Chadata); //y = 1993
        sl_index_m = Li_Chadata.indexOf("/", 2);
        dt_index_m = Li_Chadata.indexOf("-", 2);
        hi_index_m = Li_Chadata.indexOf(".", 2);
        if (sl_index_m == 4 || dt_index_m == 4 || hi_index_m == 4) {
          //月1桁確定 日付 2桁確定 //H0/8/02
          m = "0" + Li_Chadata.substr(3, 1);
          d = Li_Chadata.substr(5, 2);
        }
        if (sl_index_m == 5 || dt_index_m == 5 || hi_index_m == 5) {
          //月2桁確定 日付 1桁確定 //H0/08/1
          m = Li_Chadata.substr(3, 2);
          d = "0" + Li_Chadata.substr(6, 1);
        }
      }
      if (sl_index == 3 || dt_index == 3 || hi_index == 3) {
        // H00/2/1 が確定
        wareki_dgt = 1;
        WaretkitoSeireki(Li_Chadata); //y = 1993
        m = "0" + Li_Chadata.substr(4, 1);
        d = "0" + Li_Chadata.substr(6, 1);
      }
    }
    if (Li_Chadata_strCount == 6) {
      //H0/2/1が確定
      wareki_dgt = 0;
      WaretkitoSeireki(Li_Chadata); //y = 1993
      m = "0" + Li_Chadata.substr(3, 1);
      d = "0" + Li_Chadata.substr(5, 1);
    }
    Lo_Data = y + "/" + m + "/" + d;
  }

  let wareki_format_B = /^[M|m|T|t|S|s|H|h|R|r]\d{1,2}[\/,\.,\-]\d{3,4}$/;
  let wareki_format_B_result = Li_Chadata.match(wareki_format_B);

  if (wareki_format_B_result != null) {
    if (Li_Chadata_strCount == 8) {
      //h05-0801 確定
      wareki_dgt = 1;
      WaretkitoSeireki(Li_Chadata); //y = 1993
      m = Li_Chadata.substr(4, 2);
      d = Li_Chadata.substr(6, 2);
    }
    if (Li_Chadata_strCount == 7) {
      //H05/801 確定
      wareki_dgt = 1;
      WaretkitoSeireki(Li_Chadata); //y = 1993
      m = "0" + Li_Chadata.substr(4, 1);
      d = Li_Chadata.substr(5, 2);
    }
    if (Li_Chadata_strCount == 6) {
      //H5.801 確定
      wareki_dgt = 0;
      WaretkitoSeireki(Li_Chadata); //y = 1993
      m = "0" + Li_Chadata.substr(3, 1);
      d = Li_Chadata.substr(5, 2);
    }
    Lo_Data = y + "/" + m + "/" + d;
  }

  chkDate(y, m, d);

  if (fail_date != 1) {
    Li_Chadata = Lo_Data;
  } else {
    Li_Chadata = "";
  }
  //Output date
  return Li_Chadata;
};

//妥当性チェック関数
const chkDate = (cy, cm, cd) => {
  chkdate = new Date(cy, cm - 1, cd);

  fail_date = 0;

  if (
    chkdate.getFullYear() != cy ||
    chkdate.getMonth() != cm - 1 ||
    chkdate.getDate() != cd
  ) {
    // window.alert("不正な日付です");
    // console.log("不正な日付です")
    fail_date = 1;
  } else {
    // window.alert("有効な日付です");
    // console.log("有効な日付です")
    fail_date = 0;
  }
};

//Wareki
const WaretkitoSeireki = (Li_ytemp) => {
  let Li_ytemp_gengo, Li_ytemp_nen;
  Li_ytemp_gengo = Li_ytemp.substr(0, 1);
  if (wareki_dgt < 1) {
    //0のとき
    Li_ytemp_nen = Li_Chadata.substr(1, 1); //H5 → 数字の5を取り出す
  } else {
    //1のとき
    Li_ytemp_nen = Li_Chadata.substr(1, 2); //05 → 数字の5を取り出す
  }
  Li_ytemp_nen = Number(Li_ytemp_nen);
  if (Li_ytemp_gengo == "M" || Li_ytemp_gengo == "m") {
    y = 1868 + Li_ytemp_nen - 1;
  } else if (Li_ytemp_gengo == "T" || Li_ytemp_gengo == "t") {
    y = 1912 + Li_ytemp_nen - 1;
  } else if (Li_ytemp_gengo == "S" || Li_ytemp_gengo == "s") {
    y = 1926 + Li_ytemp_nen - 1;
  } else if (Li_ytemp_gengo == "H" || Li_ytemp_gengo == "h") {
    y = 1989 + Li_ytemp_nen - 1;
  } else if (Li_ytemp_gengo == "R" || Li_ytemp_gengo == "r") {
    y = 2019 + Li_ytemp_nen - 1;
  }
};
