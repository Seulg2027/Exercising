package com.seulgi.testapp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.*
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.ValueEventListener
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase

class BoardListActivity : AppCompatActivity() {

    // 타입 정해준다
    lateinit var LVadapter : ListViewAdapter

    val list = mutableListOf<Model>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_board_list)

        val writeBtn = findViewById<Button>(R.id.writeBtn)
        writeBtn.setOnClickListener{
            val intent = Intent(this, BoardWriteActivity::class.java)
            startActivity(intent)
        }

        getData() // 데이터를 먼저 가져오고 나서

        LVadapter = ListViewAdapter(list)

        val lv = findViewById<ListView>(R.id.lv)
        lv.adapter = LVadapter
    }

    fun getData(){

        val database = Firebase.database
        val myRef = database.getReference("message")

        val postListener = object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                // 데이터를 돌려서 화면에 나타냄
                for (dataModel in dataSnapshot.children){
                    val item = dataModel.getValue(Model::class.java)
                    list.add(item!!)
                }

                // 비동기적으로 실행되기 때문에 데이터가 바뀐 것을 업데이트 시켜주어야 함
                LVadapter.notifyDataSetChanged()
            }

            override fun onCancelled(databaseError: DatabaseError) {
                Log.w("BoardListActivity", "loadPost:onCancelled", databaseError.toException())
            }
        }
        myRef.addValueEventListener(postListener)
    }
}