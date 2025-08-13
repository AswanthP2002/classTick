import { useState } from "react";
import * as XLSX from "xlsx";


export default function useReadMeetlist() {

    return async function (evt) {
            return new Promise((resolve, reject) => {
                try {
                    //let students = []
                    const meetlistFile = evt.target.files[0]

                    const fileReader = new FileReader()

                    fileReader.onload = (evt) => {
                        const bstr = evt.target.result
                       // console.log('binary string ', bstr)
                        const workbook = XLSX.read(bstr, { type: 'binary' })
                       // console.log('workbook', workbook)
                        const workSheetName = workbook.SheetNames[0]
                       // console.log('Worksheet name', workSheetName)
                        const workSheet = workbook.Sheets[workSheetName]
                       // console.log('Worksheet', workSheet)
                        const studentData = XLSX.utils.sheet_to_json(workSheet)
                       // console.log('Student data before sendign', studentData)
                        resolve(studentData.slice(4))
                    }

                    fileReader.readAsBinaryString(meetlistFile)
                } catch (error) {
                    reject(error)
                }
            })
    }

}