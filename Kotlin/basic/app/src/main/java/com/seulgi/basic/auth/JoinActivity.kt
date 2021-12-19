package com.seulgi.basic.auth

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.*
import androidx.databinding.DataBindingUtil
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import com.seulgi.basic.MainActivity
import com.seulgi.basic.R
import com.seulgi.basic.databinding.ActivityJoinBinding

class JoinActivity : AppCompatActivity() {
    private lateinit var auth : FirebaseAuth

    private lateinit var binding : ActivityJoinBinding // binding을 만드려면 layout으로 감싸져 있어야 함

    override fun onCreate(savedInstanceState: Bundle?) {
        auth = Firebase.auth

        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_join)

        val joinBtn = findViewById<Button>(R.id.joinAction)
        joinBtn.setOnClickListener{
            var isGoToJoin = true

            val email = binding.emailArea.text.toString()
            val pwd = binding.passwordArea.text.toString()
            val pwdcheck = binding.passwordcheck.text.toString()

            if (email.isEmpty()){
                Toast.makeText(this, "이메일을 입력해주세요. ", Toast.LENGTH_SHORT).show()
                isGoToJoin = false
            }
            if (pwd.isEmpty()){
                Toast.makeText(this, "패스워드를 입력해주세요. ", Toast.LENGTH_SHORT).show()
                isGoToJoin = false
            }
            if (pwdcheck.isEmpty()){
                Toast.makeText(this, "패스워드 확인을 입력해주세요. ", Toast.LENGTH_SHORT).show()
                isGoToJoin = false
            }
            // 비번 두개가 같은지 확인
            if (!pwd.equals(pwdcheck)){
                Toast.makeText(this, "패스워드를 똑같이 입력해주세요. ", Toast.LENGTH_SHORT).show()
                isGoToJoin = false
            }
            if (pwd.length < 6){
                Toast.makeText(this, "비밀번호를 6자리 이상으로 입력해주세요. ", Toast.LENGTH_SHORT).show()
                isGoToJoin = false
            }
            if ( isGoToJoin ){
                auth.createUserWithEmailAndPassword(email, pwd)
                    .addOnCompleteListener(this) { task ->
                        if (task.isSuccessful) {
                            // 회원가입 성공 //
                            Toast.makeText(this, "성공", Toast.LENGTH_SHORT).show()

                            val intent = Intent(this, MainActivity::class.java)
                            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                            startActivity(intent)
                        } else {
                            // 회원가입 실패 //
                            Toast.makeText(this, "실패", Toast.LENGTH_SHORT).show()
                        }
                    }
            }
        }
    }

}