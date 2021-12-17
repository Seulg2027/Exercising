package com.seulgi.testapp

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.*
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase

class BoardWriteActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_board_write)

        val writeBtn:Button = findViewById(R.id.writeUploadBtn)
        writeBtn.setOnClickListener {
            val writeText:EditText = findViewById(R.id.writeTextArea)

            // 데이터 베이스를 불러오는 경로 //
            val database = Firebase.database
            val myRef = database.getReference("message")

            myRef.push().setValue(
                Model(writeText.text.toString())
            )
        }
    }
}