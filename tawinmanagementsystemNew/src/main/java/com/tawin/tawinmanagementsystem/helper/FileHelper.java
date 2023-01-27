package com.tawin.tawinmanagementsystem.helper;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.TimeZone;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileHelper {

    public final String UPLOAD_DIR = Paths.get("uploads").toAbsolutePath().toString();
    public final String UPLOAD_EMP = Paths.get("imageEmp").toAbsolutePath().toString();
    public final String UPLOAD_PAY = Paths.get("imagePay").toAbsolutePath().toString();
    // public final String UPLOAD_DIR = "/Users/kla/Desktop/work15/tawinmanagementsystemNew/Files-Upload";

    // public FileHelper()throws IOException
    // {

    // }
   

    public boolean uploadFile(MultipartFile multipartFile) {
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Bangkok"));

        int hours = calendar.get(Calendar.HOUR_OF_DAY);
        int minutes = calendar.get(Calendar.MINUTE);
        int sec = calendar.get(Calendar.SECOND);
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        int month = calendar.get(Calendar.MONTH);
        int year = calendar.get(Calendar.YEAR);
    
        String datetime = "D"+day+"-"+month+"-"+year+"-T"+hours+"."+minutes+"."+sec;

        

        boolean f = false;
        try {

            Files.copy(multipartFile.getInputStream(), Paths.get(UPLOAD_DIR + File.separator + datetime+".jpg"),
                    StandardCopyOption.REPLACE_EXISTING);
            f = true;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return f;
    }

    public boolean uploadFileEmp(MultipartFile multipartFile) {
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Bangkok"));

        int hours = calendar.get(Calendar.HOUR_OF_DAY);
        int minutes = calendar.get(Calendar.MINUTE);
        int sec = calendar.get(Calendar.SECOND);
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        int month = calendar.get(Calendar.MONTH);
        int year = calendar.get(Calendar.YEAR);
    
        String datetime = "D"+day+"-"+month+"-"+year+"-T"+hours+"."+minutes+"."+sec;

        boolean f = false;
        try {

            // InputStream is = multipartFile.getInputStream();
            // byte data[] =new byte[is.available()];

            Files.copy(multipartFile.getInputStream(), Paths.get(UPLOAD_EMP + File.separator + datetime+".jpg"),
                    StandardCopyOption.REPLACE_EXISTING);
            f = true;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return f;
    }
    public boolean uploadFilePay(MultipartFile multipartFile) {
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Bangkok"));

        int hours = calendar.get(Calendar.HOUR_OF_DAY);
        int minutes = calendar.get(Calendar.MINUTE);
        int sec = calendar.get(Calendar.SECOND);
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        int month = calendar.get(Calendar.MONTH);
        int year = calendar.get(Calendar.YEAR);
    
        String datetime = "D"+day+"-"+month+"-"+year+"-T"+hours+"."+minutes+"."+sec;

        boolean f = false;
        try {

            // InputStream is = multipartFile.getInputStream();
            // byte data[] =new byte[is.available()];

            Files.copy(multipartFile.getInputStream(), Paths.get(UPLOAD_PAY + File.separator + datetime+".jpg"),
                    StandardCopyOption.REPLACE_EXISTING);
            f = true;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return f;
    }

}
