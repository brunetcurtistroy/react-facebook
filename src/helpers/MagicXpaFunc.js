class MagicXpaFunc {
  /**
   * Returns a token from a delimited string.
   * @link http://ftp.magicsoftware.com/www/help/uniPaaS/mergedProjects/MGHELPW/Expression_Editor/StrToken.htm
   *
   * @param $SourceString - delimited alpha string with tokens.
   * @param $TokenIndex - requested token index (numeric).
   * @param $DelimitersString - alpha string containing the delimiter string.
   *
   * @return string Contains the requested token or empty string when not found.
   */
  static StrToken($SourceString, $TokenIndex, $DelimitersString) {
    // return explode($DelimitersString, $SourceString)[$TokenIndex - 1] ?? '';

    const ar = $SourceString?.split($DelimitersString);
    return ar ? ar[$TokenIndex - 1] : '';
  }

  /**
   * Returns the token index in a delimited Alpha string.
   * @link http://ftp.magicsoftware.com/www/help/uniPaaS/mergedProjects/MGHELPW/Expression_Editor/StrTokenIdx.htm
   *
   *
   * @param $source_string A delimited Alpha string containing at least one token.
   * @param $token The token value.
   * @param $delimiter Characters separating the tokens in an Alpha string.
   *
   * @return The position order of the token within the delimited Alpha string as determined by the delimiters.
   *
   * @note A space cannot be a delimiter.
   *
   * @example StrTokenIdx('AA,BB,CC,DD','CC',',') returns 3.
   */
  static StrTokenIdx($source_string, $token, $delimiter) {
    // $key = array_search($token, explode($delimiter, $source_string));
    // return ($key !== false) ? ($key + 1) : 0;
  }

  /**
   *
   * @example StrTokenCnt('abcd\cdef\ghik\lmnp','\') return 4
   */
  static StrTokenCnt($SourceString, $delimiter) {
    // return count(explode($delimiter, $SourceString)) ?? 1;
  }

  /**
   * Replace string
   *
   * @example string RepStr('BB//CC//DD//EE','//','==',) . 'BB==CC==DD==EE'
   */
  static RepStr($source_string, $search_string, $replace_to) {
    // return str_replace($search_string, $replace_to, $source_string);
  }

  /**
   * 全角文字（英数字、またはカタカナ）を半角文字に変換します。
   */
  static Han($source_string) {
    // Han('１６ＫＢ')='16KB'
    // Han('カタカナ')='カタカナ'
    // return mb_convert_kana($source_string, 'aV');
  }

  static Upper($source_string) {
    // return strtoupper($source_string);
  }

  static ZKana($source_string, $mode) {
    // switch ($mode) {
    //   case 0: {
    //     return mb_convert_kana($source_string, 'CV');
    //   }
    //   case 1: {
    //     return mb_convert_kana($source_string, 'cV');
    //   }
    //   default: {
    //     return $source_string;
    //   }
    // }
  }

  static Left($str, $cnt) {
    // return mb_substr($str, 0, $cnt);
  }

  static InStr($str, $search) {
    // if (empty($str) || empty($search)) {
    //   return 0;
    // }
    // $pos = strpos($str, $search);
    // return ($pos === false) ? 0 : ($pos + 1);
  }

  static Del($str, $start, $cnt) {
    // $result = '';
    // for ($i = 0; $i < mb_strlen($str); $i++) {
    //   $realI = $i + 1;
    //   if (($realI < $start) || ($realI > ($start + $cnt))) {
    //     $result += $str[$i];
    //   }
    // }

    // return $result;
  }

  /**
   * @example string Fill('*', 5) return *****
   */
  static Fill($string, $number_of_times) {
    // $result = '';
    // for ($i = 0; $i < $number_of_times; $i++) {
    //   $result += $string;
    // }
    // return $result;
  }

  /**
   * @example string Right('abcdef', 3) return 'def'
   */
  static Right($string, $number_of_characters) {
    // return mb_substr($string, mb_strlen($string) - $number_of_characters, $number_of_characters);
  }

  static Str($str, $format) {
    $str = $str?.toString() || '';
    // TODO: convert format

    let $matches = $format.match(/^(\d+)P(\d+)Z?0?$/);
    if ($matches) {
      $str = $str.padStart($matches[1], $matches[2]);
      return $str;
    }

    return $str;
  }

  static Len($str) {
    // return mb_strlen($str);
  }


  static mTime() {
    // $date = date('H:i:s.u');
    // [$h, $m, $s] = explode(':', $date);
    // return floor(($h * 3600 + $m * 60 + $s) * 1000);
  }

  /**
   * @deprecated This can not use
   */
  static CndRange($condition, $value) {
    // throw new RuntimeException('Please use Converted coding convention for this');

    // if ($condition) {
    //   return $value;
    // }
  }

  static Val($str, $format) {
    // TODO: Use format
    return Number($str);
  }

  static DVal($date, $format) {
    // return date_format($date, $format);
  }

  static VarPic($variable, $mode) {
    // if ($mode == 1) {
    //   return $variable;
    // }
  }
  /**
   * Get all file with extension in directory
   *
   * @param $directoryName: storage_path('folder-name')
   * @param $extensions: *.csv|*.xlsx
   * @param $getFromAllSubDir: true|false
   */
  static FileListGet($directoryName, $extensions, $getFromAllSubDir = false) {
    // $extList = explode('|', $extensions);
    // $directories = \Storage::allDirectories($directoryName);
    // $files = [];

    // foreach ($extList as $ext) 
    // {

      // $extFiles = glob(storage_path($directoryName + '/' + $ext));

      // foreach ($extFiles as $file) 
      // {
        // array_push($files, $file);
      // }
    // }

    // return $files;
  }

  /**
   * Calculate date
   *
   * @param $firstDay
   * @param $operator
   * @param $secondDay
   * @return string|null
   */
  static MDate($firstDay = null, $operator = null, $secondDay = null) {
    // if (is_null($firstDay) && is_null($operator) && is_null($secondDay)) {
    //   return date('Y-m-d');
    // }

    // $intFirstDay = strtotime($firstDay);

    // if (is_int($secondDay)) {
    //   $intSecondDay = $secondDay * 86400;
    // } else {
    //   $intSecondDay = strtotime($secondDay);
    // }

    // $calculatedDay = $operator === '+' ? ($intFirstDay + $intSecondDay) : ($intFirstDay - $intSecondDay);

    // return date('Y-m-d', $calculatedDay ? $calculatedDay : null);
  }

  static MID($sourceStr, $from, $len) {
    return $sourceStr?.substr($from - 1, $len);
  }

  static AddDate($date, $years, $months, $days) {
    // if (!empty($date)) {
    //   $Newdate = new Carbon($date);
    //   if (!empty($years)) {
    //     $Newdate = $Newdate.addYears($years);
    //   }
    //   if (!empty($months)) {
    //     $Newdate = $Newdate.addMonths($months);
    //   }
    //   if (!empty($days)) {
    //     $Newdate = $Newdate.addDays($days);
    //   }
    //   return $Newdate.toDateString();
    // }
  }

  static DStr($date, $format) {
    // $fmt = {
    //   'YYYY': 'Y',
    //   'MM': 'm',
    //   'DD': 'd',
    //   'Z': '',
    // };
    // return date(str_replace(array_keys($fmt), array_values($fmt), $format), strtotime($date));
  }

  /** 時刻に時数/分数/秒数を加算した値を取得します。結果は、時刻型で返ります。 */
  /** Time to get the value obtained by adding the Jisu / fraction / number of seconds. The result is returned in time type. */
  static AddTime($timeStr, $h, $i, $s) {
    // [$_h, $_i, $_s] = explode(':', $timeStr);
    // $curTs = ($_h ?? 0) * 60 * 60 + ($_i ?? 0) * 60 + ($_s ?? 0);
    // $nTs = $h * 60 * 60 + $i * 60 + $s;
    // return (new DateTime('@' + ($curTs + $nTs))).format('H:i:s');
  }

  /** ASCIIコードを対応する文字に変換します。 */
  /** To convert the ASCII code to the corresponding character. */
  static ASCIIChr($charcode) {
    // $value = mb_convert_encoding(chr($charcode), 'ascii', 'utf-8');
    // $trimVal = trim($value);
    // return ((mb_strlen($value) === 1) && (mb_strlen($trimVal) === 0)) ? trim($value) : $value;
  }

  /** 文字列（英数字）の左端の文字をASCII コード値に変換します。 */
  /** Converts the left edge of the character string (alphanumeric) to ASCII code value. */
  static ASCIIVal($str) {
    // return ord($str);
  }

  /** 指定した書式で変換された文字列を取得します。 */
  /** Gets the has been converted to the specified format string. */
  static AStr($source_string, $format_string) {
    // TODO: Use $format_string
    // return $source_string;
  }

  /** BLOB オブジェクトをファイルに保存します。 */
  /** Save the BLOB object to a file. */
  static Blb2File($variable, $file_name) {
    // return file_put_contents($file_name, $variable);
  }

  /** 指定した月の最初の日付を取得します。 */
  /** It gets the first date of the specified month. */
  static BOM($date) {
    // return date('Y/m/01', strtotime($date));
  }

  /** Magic xpaからCDECL呼び出し規約でDLLを呼び出します。 */
  /** You call the DLL in CDECL calling convention from Magic xpa. */
  static CallDLL($param = null) {
    // return null;
  }

  /** ［エディット］コントロール内の現在のキャレットの位置を取得します。位置は、表示内容の先頭からの文字数として返ります。［エディット］コントロールの一番左端は、「1」になります。 */
  /** It gets the current position of the caret [edit] in the control. Position, returned as a number of characters from the beginning of the display contents. [Edit] the far left of control, it will be "1". */
  static CaretPosGet($param = null) {
    // return null;
  }

  /** 指定された条件に基づいて、値の切り替えを行います。If 文のネストが不要になります。 */
  /** Based on specified criteria, perform the switching of the value. Nesting If statement will be unnecessary. */
  static CASE($cnd, ...$cases) {
    let $defaultPos = $cases.length - 1;
    for (let $i = 0; $i < $defaultPos; $i += 2) {
      if ($cnd === $cases[$i]) {
        return $cases[$i + 1];
      }
    }

    return $cases[$defaultPos];
  }

  /** 日付に対応する英語の曜日名(Sunday、Mondayなど)を取得します。 */
  /** English name of the day corresponding to the date (Sunday, Monday, etc.) to get the. */
  static CDOW($date) {
    // setlocale(LC_ALL, 'en_US');
    // return date('l', $date);
  }

  /** 指定したコントロールまたはカーソルが最後にパークしたコントロールの高さを取得します。 */
  /** It gets the height of the control that the specified control or the cursor is parked at the end. */
  static CHeight($param = null) {
    return null;
  }

  /** 最後にクリックしたウィンドウ(フォーム)のクリック位置(X座標)を取得します。 */
  /** Gets the last click in the window click position of the (form) (X coordinates). */
  static ClickWX($param = null) {
    return null;
  }

  /** 最後にクリックしたウィンドウ(フォーム)のクリック位置(Y座標)を取得します。 */
  /** Gets the last clicked window to click position of the (form) (Y-coordinate). */
  static ClickWY($param = null) {
    return null;
  }

  /** OSのクリップボードに追加する値と型を定義してバッファに追加します。 */
  /** To define the values ​​and types to be added to the clipboard of the OS and add it to the buffer. */
  static ClipAdd($param = null) {
    return null;
  }

  /** ClipAdd関数で定義された内容をOSのクリップボードに書き込みます。 */
  /** The description provided in the ClipAdd and writes it to the clipboard of the OS. */
  static ClipWrite($param = null) {
    return null;
  }

  /** バッチタスクや非インタラクティブなリッチクライアントタスクにおけるレコードレベル処理の実行回数が返ります。 */
  /** The number of executions of record-level processing in a batch tasks and non-interactive rich client task is returned. */
  static Counter($param = null) {
    return null;
  }

  /** カーソルを指定したコントロールに移動します。 */
  /** Go to the specified control the cursor. */
  static CtrlGoto($param = null) {
    return null;
  }

  /** コンテキスト名に対応したコンテキストIDを取得します。 */
  /** Gets the context ID corresponding to the context name. */
  static CtxGetId($param = null) {
    return null;
  }

  /** 現在のコンテキスト名を取得します。 */
  /** It gets the current context name. */
  static CtxGetName($param = null) {
    return null;
  }

  /** アプリケーションサーバ上で有効なコンテキストの数が返ります。 */
  /** The number of valid context on the application server is returned. */
  static CtxNum($param = null) {
    return null;
  }

  /** コンテキストテーブルに存在する任意のコンテキストの状態を取得します。 */
  /** You get any of the state of the context that exists in the context table. */
  static CtxStat($param = null) {
    return null;
  }

  /** [テーブル]コントロール上での現在の行番号を取得します。 */
  /** Gets the current line number on the [table] control. */
  static CurRow($param = null) {
    return null;
  }

  /** 指定されたコントロールまたは、最後にパークしたコントロールのウンドウ上の相対的なX軸の位置を取得します。 */
  /** Designated control or, it gets the position of the relative X-axis on the last control that parked exercise. */
  static CX($param = null) {
    return null;
  }

  /** 指定されたコントロールまたは、最後にパークしたコントロールのウンドウ上の相対的なY軸の位置を取得します。 */
  /** Designated control or, it gets the position of the relative Y-axis on the last control that parked exercise. */
  static CY($param = null) {
    return null;
  }

  /** システム日付を取得します。 */
  /** Get the system date. */
  static Date() {
    // return date('Y/m/d');
  }

  /** 日付の日数(1～31)を取得します。 */
  /** It gets the date of the number of days (1 to 31). */
  static Day($dateStr) {
    // return intval(date('d', strtotime($dateStr)));
  }

  /** 既存のデータソースのコピーを行います。データの定義情報もコピーされます。この関数は、ISAMとSQLの両方のファイルに使用できます。 */
  /** Make a copy of an existing data source. Definition information of the data will be copied. This can be used to ISAM and SQL both files. */
  static DbCopy($tableNumber, $tableName = null, $tableCopyName = null) {
    // return DbCopy($tableNumber, $tableName, $tableCopyName);
  }

  /** [データ］リポジトリに定義されているデータソースを削除します。 */
  /** [Data] to delete the data source that is defined in the repository. */
  static DbDel($tableNumber, $fileName = null) {
    // return DbDel($tableNumber, $fileName);
  }

  /** [データ]リポジトリのデータソース名を取得します。 */
  /** It gets the data source name of [data] repository. */
  static DbName($tableNumber, $alias = null) {
    // return DbName($tableNumber, $alias);
  }

  /** データソースにある行（レコード）数を取得します。 */
  /** It gets the number of rows (records) in the data source. */
  static DbRecs($tableNumber, $fileName = null) {
    // return DbRecs($tableNumber, $fileName);
  }

  /** 現在のデータビュー内のレコード数を取得します。 */
  /** It gets the number of records in the current data view. */
  static DbViewSize($param = null) {
    return null;
  }

  /** Magic xpaからDDEサーバへコマンド文字列を転送します。３つの識別子「サービス」、「トピック」、「項目」を組み合わせて、各DDEサーバアプリケーションにアクセスできます。この３つの識別子によってアクセス対象を特定できます。 */
  /**
   * From Magic xpa to the DDE server to transfer the command string. Three identifiers "service", "topic", a combination of the "item", you can access each DDE server application. You can identify the access target by the three identifiers.
   *
   * @deprecated
   */
  static DDExec($param = null) {
    return null;
  }

  /** 現在の処理を0.1秒単位で一時的に中断します。 */
  /** The current treatment temporarily interrupted in units of 0.1 seconds. */
  static Delay($tenth_of_seconds = 1) {
    // return usleep($tenth_of_seconds * 100000);
  }

  /** Windowsの[フォルダーの参照]ダイアログボックスを開き、選択したディレクトリ名を取得します。 */
  /**
   * Open the Windows of the Browse for Folder dialog box, you get the name of the directory that you selected.
   *
   * @deprecated
   */
  static DirDlg($param = null) {
    return null;
  }

  /** 日付の曜日番号を取得します。 */
  /** It gets the day of the week number of the date. */
  static DOW($date) {
    // return date('w', strtotime($date)) + 1;
  }

  /** 自動的にドラッグ処理されないコントロールのデータ内容やフォーマットを定義します。また、異なるデータフォーマットにデータ内容を割り当てます。 */
  /**
   * Automatically defines the data content and format of the control that are not dragged processing. Also, assign the data contents in different data formats.
   *
   * @deprecated
   */
  static DragSetData($param = null) {
    return null;
  }

  /** 指定したフォーマットでドロップされたデータを取得します。 */
  /** It gets the dropped in the specified format data. */
  static DropGetData($param = null) {
    return null;
  }

  /** 指定した入出力ファイルのデータ処理が終了したかどうかを確認します。入出力ファイルのデータが終わった場合、EOF フラグが立てられますが、この関数を使用してEOF フラグを検索します。 */
  /** Data processing of the specified input and output file will check whether the end. If the data in the input and output file has been completed, but is set if the EOF flag, to find the EOF flag to use this function. */
  static EOF($generation, $device) {
    return null;
  }

  /** 日付を指定された月の最後の日付を取得します。 */
  /** It gets the last date of a given month to date. */
  static EOM($date) {
    // return date('Y/m/t', strtotime($date));
  }

  /** エラーが発生したデータベースの名前が返ります。 */
  /**
   * It returns the name of the database where the error occurred.
   *
   * @deprecated
   */
  static ErrDatabaseName($param = null) {
    return null;
  }

  /** エラーが発生したDBMSのオリジナルのエラーコードが返ります。 */
  /**
   * DBMS original error code of where the error occurred is returned.
   *
   * @deprecated
   */
  static ErrDbmsCode($param = null) {
    return null;
  }

  /** エラーが発生したDBMSのオリジナルのエラーメッセージが返ります。 */
  /**
   * An error is returned DBMS of the original error message that occurred.
   *
   * @deprecated
   */
  static ErrDbmsMessage($param = null) {
    return null;
  }

  /** 直前に発生したMagic xpaのエラーメッセージを取得します。エラー一覧に表示されている文字列で返ります。 */
  /**
   * Get the Magic xpa of error messages that occurred just before. It returns a string that is displayed in the error list.
   *
   * @deprecated
   */
  static ErrMagicName($param = null) {
    return null;
  }

  /** エラーが発生したレコードの位置が返ります。 */
  /**
   * Error is returned is the position of the record that occurred.
   *
   * @deprecated
   */
  static ErrPosition($param = null) {
    return null;
  }

  /** エラーが発生したDB テーブル名を取得します。 */
  /**
   * Get the DB table name where the error occurred.
   *
   * @deprecated
   */
  static ErrTableName($param = null) {
    return null;
  }

  /** 指定した文字列をMagic xpaの式として実行し、実行結果を取得します。 */
  /** It executes the specified string as an expression of Magic xpa, to obtain the results. */
  static EvalStr($str, $default_value) {
    // return eval($str) ?? $default_value;
  }

  /** EvalStr関数を使用して評価される式に関する情報を取得します。 */
  /**
   * Use the EvalStr to obtain information about the expression to be evaluated.
   *
   * @deprecated
   */
  static EvalStrInfo($expression_string, $option) {
    return null;
  }

  /** 指定された式番号の定義式を実行します。 */
  /**
   * Run the definition expression of the specified expression number.
   *
   * @deprecated
   */
  static ExpCalc($expression_specification) {
    return null;
  }

  /** ファイルをコピーします。 */
  /** Copy the file. */
  static FileCopy($filePath, $newFilePath) {
    // return copy($filePath, $newFilePath);
  }

  /** ディスク上のファイルを削除します。 */
  /** Delete the files on the disk. */
  static FileDelete($filePath) {
    // return delete ($filePath);
  }

  /** Windows の[ファイルを開く]ダイアログをオープンし、選択したファイル名が返ります。 */
  /**
   * Open the File Open dialog of Windows, it returns the selected file name.
   *
   * @deprecated
   */
  static FileDlg($param = null) {
    return null;
  }

  /** ファイルの存在の確認（ディスク上） */
  /** Confirmation of the presence of the file (on disk) */
  static FileExist($file_name) {
    // return file_exists($file_name);
  }

  /**
   * Returns the file properties.
   * @link http://ftp.magicsoftware.com/www/help/uniPaaS/mergedProjects/MGHELPW/FileInfo.htm
   */
  static FileInfo($name, $info_type) {
    // switch ($info_type) {
    //   case 1:
    //     return basename($name);
    //   case 2:
    //     return base_path($name);
    //   case 3:
    //     return realpath($name);
    //   case 4:
    //     return;
    //   case 5:
    //     return filesize($name);
    //   case 6:
    //     return date('Y/m/d', this.FileInfo($name, 7));
    //   case 7:
    //     return filectime($name);
    //   case 8:
    //     return date('Y/m/d', this.FileInfo($name, 9));
    //   case 9:
    //     return filemtime($name);
    //   case 10:
    //     return date('Y/m/d', this.FileInfo($name, 11));
    //   case 11:
    //     return fileatime($name);
    //   default:
    //     return null;
    // }
  }

  /** ディスク上のファイルの名前を変更します。 */
  /** Change the name of the file on the disk. */
  static FileRename($filePath, $newName) {
    // $folders = explode('/', $filePath);
    // unset($folders[count($folders) - 1]);

    // $newFilePath = $filePath + '/' + $newName;

    // return Smove($filePath, $newFilePath);
  }

  /** ディスク上のファイルのサイズ(バイト)を取得します。 */
  /** It gets the size of the file on disk (in bytes). */
  static FileSize($filePath) {
    // return size($filePath);
  }

  static Fix($num, $NLen, $FLen) {
    // $numStr = $num;
    // [$N, $F] = explode('.', $numStr);
    // $N = this.Right($N, $NLen);
    // $F = this.Left($F, $FLen);

    // return (float)($N + '.' + $F);
  }

  /**
   * Make sure the flow mode of the current operation.
   * 現在の操作のフローモードを確認します。
   *
   * @deprecated
   * */
  static Flow($param = null) {
    return null;
  }

  /** ハンドラが起動されたコントロールの名前を取得します。 */
  /** Handler Gets the name of the control that has been started. */
  static HandledCtrl($param = null) {
    return null;
  }

  /** 時刻の時数値を取得します。 */
  /** It gets the numerical value when the time. */
  static Hour($time) {
    // return date('H', strtotime($time));
  }

  /** 10進数を16進数に変換します。 */
  /** It converts a decimal number to hexadecimal. */
  static HStr($numeric) {
    // return dechex($numeric);
  }

  /** 論理式を評価し、その式の戻り値(「True」または「False」)に応じて処理を分岐させることができます。Ifはネストして使用できます。 */
  /** To evaluate a logical expression, you can branch the process in accordance with the expression of the return value ( "True" or "False"). If you can use nested. */
  static IF($cnd, $thenTrue, $thenFalse) {
    return $cnd ? $thenTrue : $thenFalse;
  }

  /** MAGIC.INI ファイルの環境設定値を取得します。 */
  /** It gets the environment settings of MAGIC.INI file. */
  static INIGet($param = null) {
    return null;
  }

  /** MAGIC.INIファイルの環境設定値を更新します。 */
  /** Update the environment settings of MAGIC.INI file. */
  static INIPut($param = null) {
    return null;
  }

  /** 文字列を別の文字列に挿入します。 */
  /** Inserts a string into another string. */
  static Ins($target, $source, $position, $length) {
    // $output = '';

    // for ($i = 0; $i < mb_strlen($target); $i++) {
    //   $output += $target[$i];
    //   if ($i === ($position + 1)) {
    //     for ($j = 0; $j < $length; $j++) {
    //       $output += $source[$j];
    //     }
    //   }
    // }

    // return $output;
  }

  /** タスク内の最初のレコードサイクルかどうかを確認します。この内容は、[タスク前]の後にフェッチされたデータの内容を処理したり、タスクに入って一回だけ実行する処理がある場合の判定に使用できます。 */
  /** Check to see if the first record cycle in the task. This content can be used to determine if there is a process to be executed only once entered the processing or, task fetched the contents of the data after the [task before]. */
  static IsFirstRecordCycle($param = null) {
    return null;
  }

  /** 日付から日本語の曜日名（日曜日、月曜日など）を求めます。 */
  /** Japanese name of the day from the date (Sunday, Monday, etc.) determined. */
  static JCDOW($date) {
    // setlocale(LC_ALL, 'ja_JP');
    // return date('l', $date);
  }

  /** 日付から元号名を取得します。文字数に「1」が指定されると、元号のシンボル名を返し、「2」または「4」が指定されると漢字名を返します。 */
  /** Get the era name from the date. When the characters "1" is specified in, it returns the symbol name of the era, returns the kanji name and "2" or "4" is specified. */
  static JGengo($dateStr, $num) {
    // $formatter = new IntlDateFormatter((($num === 1) ? 'en_US' : 'ja_JP') + '@calendar=japanese', IntlDateFormatter.FULL,
    //   IntlDateFormatter.NONE, 'Asia/Tokyo', IntlDateFormatter.TRADITIONAL, 'G');

    // $output = $formatter.format($dateStr);
    // switch ($num) {
    //   case 1:
    //   case 2:
    //     return mb_substr($output, 0, 1);
    //   case 4:
    //     return $output;
    // }
  }

  /** 週の曜日番号（1、2など）を対応する曜日名（日曜日、月曜日など）に変換します。 */
  /** Day of the week name that corresponds to the day of the week number (1, 2, etc.) (Sunday, Monday, etc.) and converts it to. */
  static JNDOW($date) {
    // return this.DOW($date);
  }

  /** 日付から元号年を求めます。 */
  /** Find the era year from date. */
  static JYear($dateStr) {
    // $formatter = new IntlDateFormatter('en_US@calendar=japanese', IntlDateFormatter.FULL,
    //   IntlDateFormatter.NONE, 'Asia/Tokyo', IntlDateFormatter.TRADITIONAL, 'U');

    // return intval($formatter.format(strtotime($dateStr)));
  }

  /** 直前のキー入力、または内部イベントを取得します。 */
  /** @deprecated Get the previous key input or internal events,. */
  static KbGet($param = null) {
    return null;
  }

  /** 内部イベントやキー操作をシミュレートします。 */
  /** @deprecated To simulate the internal events and key operation. */
  static KbPut($param = null) {
    return null;
  }

  /** 最後にクリックされたコントロールの名前（[コントロール名]特性で指定された値）が返ります。 */
  /** Finally clicked the control name of (the value specified in [control name] property) is returned. */
  static LastClicked($param = null) {
    return null;
  }

  /** 指定タスクのフォーム内で最後にカーソルがパークしていたコントロール名が返ります。 */
  /** Finally control the name of the cursor had been parked in the form of a specified task is returned. */
  static LastPark($param = null) {
    return null;
  }

  /** タスクの実行レベルがを取得します。 */
  /** The task of execution level to get the can. */
  static Level($param = null) {
    return null;
  }

  /** 一定の時間内に一人のユーザのみによって占有される仮想的な要素（リソース）を作成し、テーブルの行やタスクをロックします。 */
  /** It is occupied only by a single user within a certain period of time to create a virtual elements (resources), to lock the line and tasks of the table. */
  static Lock($param = null) {
    return null;
  }

  /** [ブロックWhile]処理コマンドの現在の処理回数を取得します。 */
  /** @deprecated Gets the current number of processing times of [block While] processing command. */
  static LoopCounter($param = null) {
    return null;
  }

  /** 大文字を小文字に変換します。（全角英文字を含む） */
  /** Converts uppercase to lowercase. (Including a full-size letters) */
  static Lower($str) {
    // return strtolower($str);
  }

  /** 文字列の左側の空白（スペース）を削除します。 */
  /** Remove the string of left blank (space). */
  static LTrim($str) {
    // return ltrim($str);
  }

  /** タスクのメインレベルを取得します。Level関数との違いは、以下の通りです。 */
  /** It gets the main level of the task. The difference between Level is as follows. */
  static MainLevel($param = null) {
    return null;
  }

  /** マークされたテキストを取得します。 */
  /** It gets the marked text. */
  static MarkedTextGet($param = null) {
    return null;
  }

  /** 現在のフォーカスがある[エディット]コントロール内の文字列をマークします。指定された位置から指定された文字数分がマークされます。 */
  /** Mark the string there is a current focus [edit] in the control. Number of characters that have been specified from the specified position is marked. */
  static MarkText($param = null) {
    return null;
  }

  /** 複数の値の最大値を取得します。値のデータ型は同じでなければなりません。 */
  /** It gets the maximum value of a plurality of values. Data type of the value must be the same. */
  static MAX(...$values) {
    // return max($values);
  }

  /** 機能はMID関数と同じですが、全角文字を２分する場合でも半角スペースに置き換えません。 */
  /** Function is the same as the MID function, but does not replace the spaces even in the case of a 2-minute double-byte characters. */
  static MIDV($str, $startPos, $len) {
    // return substr(mb_convert_encoding($str, 'SJIS'), $startPos - 1, $len);
  }

  /** 複数の値の最小値を取得します。値のデータ型は同じでなければなりません。 */
  /** It gets the minimum value of a plurality of values. Data type of the value must be the same. */
  static MIN(...$values) {
    // return min($values);
  }

  /** 時刻の分数値を取得します。 */
  /** Get the fractional value of time. */
  static Minute($time) {
    // return intval(date('i', strtotime($time)));
  }

  /** マルチマークされた行をクリアします。 */
  /** It clears the multi-marked line. */
  static MMClear($param = null) {
    return null;
  }

  /** マルチマークされた行数が返ります。 */
  /** Multi-marked number of rows is returned. */
  static MMCount($param = null) {
    return null;
  }

  /** マークされた行の中の現在処理中の行が返ります。 */
  /** The current line being processed in the marked line is returned. */
  static MMCurr($param = null) {
    return null;
  }

  /** メニュー項目の前のチェックマークの表示/非表示を設定します。 */
  /** Set the display / non-display of the front of the check mark in the menu item. */
  static MnuCheck($param = null) {
    return null;
  }

  /** メニュー項目の有効/無効を設定します。 */
  /** It allows you to enable / disable menu items. */
  static MnuEnabl($param = null) {
    return null;
  }

  /** ユーザメニュー名を変更します。 */
  /** Change the user menu name. */
  static MnuName($param = null) {
    return null;
  }

  /** デフォルトのプルダウンメニュー構造に戻します。 */
  /** To return to the default of the pull-down menu structure. */
  static MnuReset($param = null) {
    return null;
  }

  /** メニュー項目の表示/非表示を設定します。 */
  /** Set the display / non-display of the menu item. */
  static MnuShow($param = null) {
    return null;
  }

  /** 日付の月数(1～12)を取得します。 */
  /** It gets the date of the number of months (1 to 12). */
  static Month($dateStr) {
    // return intval(date('m', strtotime($dateStr)));
  }

  /** メモリテーブルの内容がBLOBデータに変換されて返ります。 */
  /** Will return the contents of the memory table is converted into BLOB data. */
  static MTblGet($param = null) {
    return null;
  }

  /** （MTblGetで作成された）BLOB項目の内容をメモリテーブルに展開します。 */
  /** (Created by MTblGet) to expand the contents of the BLOB fields in the memory table. */
  static MTblSet($param = null) {
    return null;
  }

  /** 書式に基づいてミリ秒の時間値を文字列に変換します。 */
  /**
   * It converts the time value of milliseconds to a string based on the format.
   *
   * @return string
   *
   * @example
   * mTStr(52221123,'HH:MM:SS.mmm')
   * '14:30:21.123' を返します。
   *
   * @example
   * mTStr(52221123,'HH:MM:SS')
   * '14:30:21' を返します。
   */
  static mTStr($timestamp, $format) {
    // $repFormats = {
    //   'HH': 'H',
    //   'MM': 'i',
    //   'SS': 's',
    //   'mmm': 'u',
    // };
    // $format = str_replace(array_keys($repFormats), array_values($repFormats), $format);
    // return (new DateTime('@' + $timestamp / 1000)).format($format);
  }

  /** 項目の値をNULL に設定します。 */
  /** Set the value of an item to NULL. */
  static NULL() {
    return null;
  }

  /** 指定されたOSの環境変数の値を取得します。 */
  /** It gets the value of the environment variable for the specified OS. */
  static OSEnvGet($variable) {
    // return getenv($variable);
  }

  /**
   * It gets the page number in the current processing of the input and output files.
   * 入出力ファイルの現在処理中のページ番号を取得します。
   *
   * @deprecated
   *
   */
  static Page($param = null) {
    return null;
  }

  /** 現在のタスクの実行パスを取得します。そのタスクのパスとタスク名が文字列で返ります。パスのタスク名はセミコロン（;）で区切られます。 */
  /** It gets the execution path of the current task. Path and task name of the task is returned as a string. The task name of the path are separated by a semicolon (;). */
  static Prog($param = null) {
    return null;
  }

  /** 実行中のプログラムの公開名を取得します。 */
  /** Get the public name of the program running. */
  static PublicName($param = null) {
    return null;
  }

  /** 値が指定した範囲にあるかどうかを確認します。 */
  /** Make sure whether the range of value has been specified. */
  static Range($val, $min, $max) {
    // return ($val >= $min) && ($val <= $max);
  }

  /** 文字列の一部分を別の文字列に置き換えます。置き換えは、[位置]パラメータで指定された位置から始まります。 */
  /**
   * Replace a portion of the string to another string. Replacement, will start from the position that is specified in the [position] parameter.
   *
   * @return string Replaced with origin string
   *
   * @example Rep('12345','abcde',3,2) : '12ab5'が返ります。
   *
   */
  static Rep($target, $origin, $pos_target, $len_origin) {
    // $realPosF = $pos_target - 1;
    // $realPosT = $realPosF + $len_origin;
    // for ($i = $realPosF; $i < $realPosT; $i++) {
    //   $target[$i] = $origin[$i - $realPosF];
    // }

    // return $target;
  }

  /** 数値の一部を取り出し、その結果を四捨五入します。 */
  /** Remove the part of the numerical value, and rounding the result. */
  static Round($number, $whole, $decimal) {
    // return round(this.Fix($number, $whole, $decimal));
  }

  /** 文字列の右側の空白を削除します。 */
  /** Remove the right-hand side of the empty string. */
  static RTrim($str) {
    // return rtrim($str);
  }

  /** 時刻の秒数値を取得します。 */
  /** It gets the value of seconds of time. */
  static Second($timeStr) {
    // return intval(date('s', strtotime($timeStr)));
  }

  /**
   * Change the cursor shape.
   *
   * @deprecated
   */
  static SetCrsr($param = null) {
    return null;
  }

  /** 指定された名前に対応した共有値を取得します。共有値は、Magic xpaのメモリ上に格納されます。一度作成されると、この値は全てのコンテキストで参照することができます。 */
  /** Gets the share value corresponding to the specified name. Shared values ​​are stored in the memory of the Magic xpa. Once created, this value can be referenced in all contexts. */
  static SharedValGet($param = null) {
    return null;
  }

  /** Magic xpaのメモリ上に格納される共有値を作成します。一度作成されると、この値は全てのコンテキストで参照することができます。 */
  /** Create a shared value that is stored on the memory of Magic xpa. Once created, this value can be referenced in all contexts. */
  static SharedValSet($param = null) {
    return null;
  }

  /** 現在実行中のタスクの実行モード(照会、修正など)を確認します。 */
  /**  */
  /**
   * Execution mode of the currently running task (query, modify, etc.) make sure.
   *
   * @deprecated
   */
  static Stat($param = null) {
    return null;
  }

  /**
   * It gets the execution mode of the sub-form. This information is used when it is necessary to switch the subform logic by the runtime mode.
   * サブフォームの実行モードを取得します。この情報は、サブフォームのロジックを実行時のモードによって切り替える必要がある場合に使用します。
   *
   * @deprecated
   */
  static SubformExecMode($param = null) {
    return 1;
  }

  /** タスクの［タスクタイプ］特性の設定値を取得します。 */
  /** Get the setting for the Task type characteristics of the task. */
  static TaskTypeGet($param = null) {
    return null;
  }

  /** [動作環境]ダイアログの[端末番号]パラメータに指定されている値を取得します。 */
  /** [Terminal number] of [operating environment dialog to get the value that is specified in the parameter. */
  static Term($param = null) {
    return null;
  }

  /** システムの時刻を取得します。 */
  /** It gets the time of the system. */
  static Time($param = null) {
    // return date('H:i:s');
  }

  /** (ネストされた論理名を含めて)論理名に対応する実行名を取得します。 シークレット名は変換されません。 */
  /** (Including a logical name that is nested) Gets the run name corresponding to the logical name. Secret names are not translated. */
  static Translate($param = null) {
    return null;
  }

  /** 論理名に対応する実行名を取得します。指定された論理名が存在しない場合は、論理名がそのまま返ります。 シークレット名は変換されません。 */
  /** It gets the run name corresponding to the logical name. If the specified logical name does not exist, the logical name is returned as it is. Secret names are not translated. */
  static TranslateNR($param = null) {
    return null;
  }

  /** データツリー上の選択されたノードの現在のレベルを取得します。 */
  /** It gets the current level of the selected node on the data tree. */
  static TreeLevel($param = null) {
    return null;
  }

  /** ［ツリー］コントロールの指定されたノードIDにカーソルを移動します。 */
  /** Move the cursor to the specified node ID of [tree] control. */
  static TreeNodeGoto($param = null) {
    return null;
  }

  /** 文字列の先頭と末尾の空白を削除します。 */
  /** Remove the leading and trailing spaces of a string. */
  static Trim($str) {
    return $str.trim();
  }

  /** 時刻型のデータを指定された書式で文字列に変換します。 */
  /** Converts to string the time type of data in the specified format. */
  static TStr($timeStr, $format) {
    // TODO: format
    return $timeStr;
  }

  /** 文字列として入力された時刻の値を時刻型に変換します。 */
  /** It converts the value of the time that has been entered as a string to a time type. */
  static TVal($timeStr, $format) {
    // TODO: format
    return $timeStr;
  }

  /** 指定されたコードページに基づいて、ANSI文字列をUnicode文字に変換します。 */
  /** Based on the specified code page, to convert the ANSI string to a Unicode character. */
  static UnicodeFromANSI($ansiStr, $toCodePage) {
    // return mb_convert_encoding($ansiStr, $toCodePage, 'ASCII');
  }

  /** 指定されたコードページに基づいて、Unicode文字列をANSI文字列に変換します。 */
  /** Based on the specified code page, to convert a Unicode string to an ANSI string. */
  static UnicodeToANSI($unicodeStr, $fromCodePage) {
    // return mb_convert_encoding($unicodeStr, 'ASCII', $fromCodePage);
  }

  /** データをANSIからUTF8 にエンコードします。 */
  /** To encode the data from ANSI to UTF8. */
  static UTF8FromAnsi($str) {
    // return mb_convert_encoding($str, 'UTF-8', 'ASCII');
  }

  /** 指定した項目の現在の値を取得します。項目は、シンボル名を使用して指定します。 */
  /** It gets the current value of the specified item. Item is specified using the symbol name. */
  static VarCurr($variable) {
    return $variable;
  }

  /** カーソルが最後に置かれた項目（入力可能の項目）のシンボル名を取得します。 */
  /** Gets the symbol name of the item the cursor is placed at the end (can be input item). */
  static VarInp($param = null) {
    return null;
  }

  /** データビューのレコードが取り出されてから、項目の値が変更されているかどうかを確認します。 */
  /** From when retrieved records in the data view to see whether the value of the item has been changed. */
  static VarMod($param = null) {
    return null;
  }

  /** 指定した項目に値を設定します。 */
  /** With the specified item to set the value. */
  static VarSet($var, $val) {
    $var = $val;

    return $var;
  }

  /** ベクトル項目の指定したセルのデータを取得します。 */
  /** It gets the data for the specified cell of the vector field. */
  static VecGet($vec, $index) {
    return $vec[$index - 1] ?? null;
  }

  /** ベクトル項目の指定したセルのデータを更新します。 */
  /**
   * And then update the data in the specified cell of the vector field.
   *
   * @param array $vec
   *
   * @return bool
   */
  static VecSet($vec, $index, $val) {
    // $php_idx = $index - 1;
    // if (is_array($vec)) {
    //   $vec[$php_idx] = $val;

    //   return true;
    // }
    // abort(500, 'The first parameter must be an array: $vec.');
  }

  /** ベクトル項目のセル数を取得します。 */
  /** It gets the number of cells of a vector field.
   *
   * @param array $array
   * @return count($array) OR -1
  */
  static VecSize($array = null) {
    // if (($array !== null) && is_array($array)) {
    //   return count($array);
    // } else {
    //   return -1;
    // }
  }

  /** データビューのレコードが修正されたかどうかを確認します。 */
  /** Make sure whether the record of the data view has been modified. */
  static ViewMod($param = null) {
    return null;
  }

  /** ウィンドウのX座標、Y座標、幅、高さのいずれかが返ります。 */
  /** X coordinate of the window, Y coordinates, width, returned any of the height. */
  static WinBox($param = null) {
    return null;
  }

  /** Magic xpaのウィンドウに対応するWindows のウィンドウハンドル（HWND）が返ります。 */
  /** Windows of the window handle that corresponds to the window of Magic xpa (HWND) is returned. */
  static WinHWND($param = null) {
    return null;
  }

  /** Magic xpaのウィンドウを最大表示します。 */
  /** The window of Magic xpa and maximum display. */
  static WinMaximize($param = null) {
    return null;
  }

  /** Magic xpaのウィンドウを最小表示します。 */
  /** The window of Magic xpa to minimum display. */
  static WinMinimize($param = null) {
    return null;
  }

  /** Magic xpaのウィンドウを通常サイズに変更します。非SDIプログラムで呼び出された場合、MDIのサイズが戻ります。そして、SDIプログラムから呼び出された場合、SDIのサイズが戻ります。 */
  /** Change the window of Magic xpa to normal size. If called in a non-SDI program, it returns the size of the MDI. Then, when called from the SDI program, it returns the size of the SDI. */
  static WinRestore($param = null) {
    return null;
  }

  /** 指定された要素パスに基づいたXML要素の数またはXML属性の数を取得します。 */
  /** Gets the number of number or XML attribute of XML elements based on specified element path. */
  static XMLCnt($param = null) {
    return null;
  }

  /** 指定された要素パスに基づいたXML要素またはXML属性の値を取得します。 */
  /** It gets the value of the XML element or attribute that is based on the specified element path. */
  static XMLGet($param = null) {
    return null;
  }

  /** 指定された位置のXML要素をXMLドキュメントに追加したり、属性を既存のXML要素に追加します。 */
  /** You can add XML elements of the specified position in the XML document, add an attribute to an existing XML element. */
  static XMLInsert($param = null) {
    return null;
  }

  /** XMLドキュメントをエンコードします。ドキュメント部分とヘッダ部分の両方に影響します。ヘッダ部分のエンコード指定を読み、パラメータで指定されたエンコード方法を基にエンコードされます。 */
  /** To encode an XML document. It affects both of the document portion and a header portion. Read the encoding specification of the header portion, is encoded based on the encoding method specified by the parameter. */
  static XMLSetEncoding($param = null) {
    return null;
  }

  /** 日付の年数を取得します。4桁の数値で返ります。 */
  /** It gets the number of years of the date. It returns with a four-digit number. */
  static Year($dateStr) {
    // return intval(date('Y', strtotime($dateStr)));
  }

  /** 半角文字（英数字またはカタカナ）を全角文字に変換します。ただし、半角スペースは、全角スペースに変換しません。 */
  /** Converts a single-byte characters (alphanumeric or katakana) in double-byte characters. However, spaces are not converted to full-width space. */
  static Zen($str) {
    // ZEN('16KB')='１６ＫＢ'
    // ZEN('カタカナ')='カタカナ'
    // return mb_convert_kana($str);
  }

  /** Zen関数と同じですが、半角スペースの処理を細かく設定できます。 */
  /** It is the same as the Zen function, but you can fine-tune the processing of single-byte space. */
  static ZenS($str, $mode) {
    // $ret = this.Zen($str);
    // switch ($mode) {
    //   case 0:
    //     return $ret;
    //   case 1:
    //     return mb_convert_kana($ret, 'KVS');
    //   case 2:
    //     return str_replace(' ', '  ', $ret);
    // }
  }

  /** 直前にIMEにて入力した漢字の読みを取得します。 */
  /** It gets the reading of the Chinese character input at IME in just before. */
  static ZIMERead($param = null) {
    return null;
  }

  /**
   * Customize: Convert 'YYYY/MM/DD'DATE from Magic XPA to PHP Date
   *
   * @return string
   */
  static convDATE($dateStr) {
    // return date('Y-m-d', strtotime($dateStr));
  }

  /**
   * Customize: Convert 'HH:MM:SS'TIME from Magic XPA to PHP Date
   *
   * @return string
   */
  static convTIME($timeStr) {
    // return date('H:i:s', strtotime($timeStr));
  }
}

export default MagicXpaFunc;
