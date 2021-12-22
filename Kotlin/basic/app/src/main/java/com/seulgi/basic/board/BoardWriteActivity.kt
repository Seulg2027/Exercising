package com.seulgi.basic.board

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import com.seulgi.basic.R
import com.seulgi.basic.contentsList.BookmarkModel
import com.seulgi.basic.databinding.ActivityBoardWriteBinding
import com.seulgi.basic.utils.FBRef
import com.seulgi.basic.utils.FBauth

class BoardWriteActivity : AppCompatActivity() {

    private lateinit var binding : ActivityBoardWriteBinding

    private val TAG = BoardWriteActivity::class.java.simpleName

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = DataBindingUtil.setContentView(this, R.layout.activity_board_write)

        binding.writeBtn.setOnClickListener{
            var title = binding.titleArea.text.toString()
            var content = binding.contentArea.text.toString()

            FBRef.boardRef
                .push() // 랜덤한 값 생성
                .setValue(BoardModel(title, content, FBauth.getUid(), FBauth.getTime()))

            Toast.makeText(this, "게시글 입력 완료", Toast.LENGTH_LONG).show()

            finish() // 엑티비티 사라짐
        }
    }
}