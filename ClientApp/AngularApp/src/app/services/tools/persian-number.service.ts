import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersianNumberService {

  constructor() { }

  toPersianNumber(number: number | string): string {
    var num = number as string;
    return (this.arabicNumberTopersian(this.engNumberTopersian(num)));
  }

  isPersianNumber(number: number | string): boolean {
    var num = number as string;

    var regexp = new RegExp('^[\u06F0-\u06F9]+$');
    return regexp.test(num);
  }

  toEngNumber(number: string): number {
    var num = number as string;
    var engNumber = this.persianNumberToEng(num);

    if (isNaN(engNumber))
      throw `${number} is not valid persian Number`;
    return engNumber;
  }

  toPersianWord(number: number | string): string {
    return (new NumberToPersianWord).convertNumberToString(this.toEngNumber(number as string));
  }

  private engNumberTopersian(number: string): string {
    if (number == undefined) return '';
    var str = number.toString().trim();
    if (str === "") return "";
    str = str.replace(/0/g, '۰');
    str = str.replace(/1/g, '۱');
    str = str.replace(/2/g, '۲');
    str = str.replace(/3/g, '۳');
    str = str.replace(/4/g, '۴');
    str = str.replace(/5/g, '۵');
    str = str.replace(/6/g, '۶');
    str = str.replace(/7/g, '۷');
    str = str.replace(/8/g, '۸');
    str = str.replace(/9/g, '۹');
    return str;
  }

  private arabicNumberTopersian(number: string): string {
    if (number == undefined) return '';
    var str = number.toString().trim();
    if (str === "") return "";
    str = str.replace(/٤/g, '۴');
    str = str.replace(/٥/g, '۵');
    str = str.replace(/٦/g, '۶');
    return str;
  }

  private persianNumberToEng(number: string): number {
    if (number == undefined) return NaN;
    var str = number.toString().trim();
    var str = number.toString().trim();
    if (str === "") return NaN;
    str = str.replace(/۰/g, '0');
    str = str.replace(/۱/g, '1');
    str = str.replace(/۲/g, '2');
    str = str.replace(/۳/g, '3');
    str = str.replace(/۴/g, '4');
    str = str.replace(/۵/g, '5');
    str = str.replace(/۶/g, '6');
    str = str.replace(/۷/g, '7');
    str = str.replace(/۸/g, '8');
    str = str.replace(/۹/g, '9');
    return Number(str);
  }
}

export class NumberToPersianWord {
  // Developed By Ahmad Ahmadi
  // Email : Hakan648@yahoo.com
  // Web : DeveloperTeam.tk

  private s_0_9 = new Array('صفر', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه');
  private s_10_19 = new Array('ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده');
  private s_20_90 = new Array('بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود');
  private s_100_900 = new Array('صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد');
  private s_Parts = new Array('هزار', 'میلیون', 'میلیارد', 'تريليون');
  private splitter = " و ";
  private veryBig = "تعریف نشده";
  private negative = "منفی";

  private getPart(numberIn3) {
      if (numberIn3.length > 3)
          return "";

      var number = numberIn3.toString();

      switch (number.length) {
          case 1:
              number = "00" + number;
              break;
          case 2:
              number = "0" + number;
              break;
      }

      var outString = "";

      var n1 = parseInt(number.substr(0, 1));
      var n2 = parseInt(number.substr(1, 1));
      var n3 = parseInt(number.substr(2, 1));

      if (n1 != 0) {
          switch (n2) {
              case 0:
                  if (n3 != 0) {
                      outString = this.s_100_900[n1 - 1] + this.splitter + this.s_0_9[n3];
                  }
                  else {
                      outString = this.s_100_900[n1 - 1];
                  };
                  break;
              case 1:
                  outString = this.s_100_900[n1 - 1] + this.splitter + this.s_10_19[n3];
                  break;
              default:
                  if (n3 != 0) {
                      outString = this.s_100_900[n1 - 1] + this.splitter + this.s_20_90[n2 - 2] + this.splitter + this.s_0_9[n3];
                  }
                  else {
                      outString = this.s_100_900[n1 - 1] + this.splitter + this.s_20_90[n2 - 2];
                  }
          }
      }
      else {
          switch (n2) {
              case 0:
                  if (n3 != 0) {
                      outString = this.s_0_9[n3];
                  }
                  else {
                      outString = "";
                  }
                  break;
              case 1:
                  outString = this.s_10_19[n3];
                  break;
              default:
                  if (n3 != 0) {
                      outString = this.s_20_90[n2 - 2] + this.splitter + this.s_0_9[n3];
                  }
                  else {
                      outString = this.s_20_90[n2 - 2];
                  }
          }
      };

      return outString;
  }

  public convertNumberToString(inputNumber) {
      var tempNumber = Math.abs(inputNumber).toString();

      if (tempNumber.length == 0) {
          return "";
      }

      if (tempNumber === "0")
          return this.s_0_9[0];

      var partCount = Math.ceil((parseInt(tempNumber).toString().length / 3));

      if (this.s_Parts.length < partCount)
          return this.veryBig;

      var partFullString = new Array();

      for (var i = 0; i < partCount; i++) {
          var numberLength3;

          var lengthToSelectFirtPart;
          if (i == 0) {
              lengthToSelectFirtPart = tempNumber.length - ((partCount - 1) * 3);
              numberLength3 = tempNumber.substr((i * 3), lengthToSelectFirtPart);
          }
          else {
              numberLength3 = tempNumber.substr(lengthToSelectFirtPart + ((i - 1) * 3), 3);
          }

          var partInWord = this.getPart(numberLength3);

          var partIndex = (partCount - 2 - i);
          var partPreFix = this.s_Parts[partIndex];

          if (i == partCount - 1) {
              partPreFix = "";
          }

          if (i == 0) {
              if (partInWord != "") {
                  partFullString[i] = partInWord + " " + partPreFix;
              }
              else {
                  partFullString[i] = "";
              }
          }
          else {
              if (partFullString[i - 1] != "") {
                  if (partInWord != "") {
                      partFullString[i] = this.splitter + partInWord + " " + partPreFix;
                  }
                  else {
                      partFullString[i] = "";
                  }
              }
              else {
                  if (partInWord != "") {
                      partFullString[i] = this.splitter + partInWord + " " + partPreFix;
                  }
                  else {
                      partFullString[i] = "";
                  }
              }
          }
      }

      var outString = "";

      for (var i = 0; i < partFullString.length; i++) {
          outString += partFullString[i];
      }

      if (inputNumber.toString().substr(0, 1) == "-") {
          outString = this.negative + " " + outString;
      }

      return outString;
  }
}