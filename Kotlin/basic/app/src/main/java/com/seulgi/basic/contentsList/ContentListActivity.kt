package com.seulgi.basic.contentsList

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.*
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.ValueEventListener
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase
import com.seulgi.basic.R

class ContentListActivity : AppCompatActivity() {
    // 원래 onCreate 함수의 지역변수로 설정했으나,, if else 코드에서 인식을 못해서 전역변수로
    lateinit var myRef : DatabaseReference

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_content_list)

        // 화면에 나타낼 리스트
        val items = ArrayList<ContentModel>()
        val rvAdapter = ContentsRVAdapter(baseContext, items)

        val database = Firebase.database

        val category = intent.getStringExtra("category")


        if (category == "category1"){
            // reference 이름
            myRef = database.getReference("contents")

        } else if (category == "category2"){
            myRef = database.getReference("contents2")
        }

        // 데이터 베이스 읽기
        val postListener = object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                // Get Post object and use the values to update the UI
                for (dataModel in dataSnapshot.children){
                    Log.d("ContentListActivity", dataModel.toString())

                    val item = dataModel.getValue(ContentModel::class.java)
                    items.add(item!!)
                }
                rvAdapter.notifyDataSetChanged() // 밑에 함수들이 먼저 실행되고 데이터가 나중에 불러와지기 때문에 동기화가 필요
            }

            override fun onCancelled(databaseError: DatabaseError) {
                // Getting Post failed, log a message
                Log.w("ContentListActivity", "loadPost:onCancelled", databaseError.toException())
            }
        }
        myRef.addValueEventListener(postListener)


        // 여기에서 어뎁터 연결
        val rv : RecyclerView = findViewById(R.id.rv)

        rv.adapter = rvAdapter

        // 한줄로 된다
        // rv.layoutManager = LinearLayoutManager(this)
        // 두줄로 된다
        rv.layoutManager = GridLayoutManager(this, 2)

        // 아이템을 클릭하였을 경우
        rvAdapter.itemClick = object : ContentsRVAdapter.ItemClick {
            override fun onClick(view: View, position: Int){
                Toast.makeText(baseContext, items[position].title, Toast.LENGTH_SHORT).show()

                val intent = Intent(this@ContentListActivity, ContentShowActivity::class.java)
                // showActivity로 이동할 시 url 넘겨주기
                intent.putExtra("url", items[position].webUrl)
                startActivity(intent)
            }
        }



        // 데이터 베이스 쓰기
//        myRef2.push().setValue(
//                ContentModel(
//                        "title5",
//                        "https://img4.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202112/17/onehomelife/20211217012505262cxtw.png",
//                        "https://content.v.kakao.com/v/kCyNHJjT9W")
//        )
//        myRef2.push().setValue(
//                ContentModel(
//                        "title6",
//                        "https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/22/onehomelife/20210522141402431wgbo.png",
//                        "https://content.v.kakao.com/v/5d566eb03fc431353649033a")
//        )
//        myRef2.push().setValue(
//                ContentModel(
//                        "title7",
//                        "https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202112/17/onehomelife/20211217013602557vxxq.png",
//                        "https://content.v.kakao.com/v/kdDuXPPSbu")
//        )
//        myRef2.push().setValue(
//                ContentModel(
//                        "title8",
//                        "https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202112/09/onehomelife/2021120901322807274q4.png",
//                        "https://content.v.kakao.com/v/kOuNl8aqZ4")
//        )
    }


}