package com.seulgi.basic.board

import android.content.Intent
import android.graphics.Bitmap
import android.graphics.drawable.BitmapDrawable
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase
import com.google.firebase.storage.ktx.storage
import com.seulgi.basic.R
import com.seulgi.basic.contentsList.BookmarkModel
import com.seulgi.basic.databinding.ActivityBoardWriteBinding
import com.seulgi.basic.utils.FBRef
import com.seulgi.basic.utils.FBauth
import java.io.ByteArrayOutputStream

class BoardWriteActivity : AppCompatActivity() {

    private lateinit var binding : ActivityBoardWriteBinding

    private val TAG = BoardWriteActivity::class.java.simpleName
    // image가 업로드되는지 검사하는 변수
    private var isImageUpload = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = DataBindingUtil.setContentView(this, R.layout.activity_board_write)

        binding.writeBtn.setOnClickListener{
            var title = binding.titleArea.text.toString()
            var content = binding.contentArea.text.toString()

            // 이미지 업로드 때문에 변경.. 할당받을 키값을 미리 받아올 수 있음
            // 이미지의 이름을 key값으로 변경
            val key = FBRef.boardRef.push().key.toString()

            FBRef.boardRef
                .child(key)
                .setValue(BoardModel(title, content, FBauth.getUid(), FBauth.getTime()))

            Toast.makeText(this, "게시글 입력 완료", Toast.LENGTH_LONG).show()

            // 이미지 영역을 클릭했을 때만
            if (isImageUpload == true) {
                imageUpload(key)
            }

            finish() // 엑티비티 사라짐
        }

        binding.imageArea.setOnClickListener {
            val gallery = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.INTERNAL_CONTENT_URI)
            startActivityForResult(gallery, 100)
            isImageUpload = true
        }
    }

    private fun imageUpload(key : String){
        val storage = Firebase.storage

        // 이미지뷰 바인딩
        val imageView = binding.imageArea
        val storageRef = storage.reference
        val mountainsRef = storageRef.child(key + ".png")

        imageView.isDrawingCacheEnabled = true
        imageView.buildDrawingCache()
        val bitmap = (imageView.drawable as BitmapDrawable).bitmap
        val baos = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos)
        val data = baos.toByteArray()

        var uploadTask = mountainsRef.putBytes(data)
        uploadTask.addOnFailureListener {
            // Handle unsuccessful uploads
        }.addOnSuccessListener { taskSnapshot ->
            // taskSnapshot.metadata contains file metadata such as size, content-type, etc.
            // ...
        }

    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == RESULT_OK && requestCode == 100){
            binding.imageArea.setImageURI(data?.data)
        }
    }
}