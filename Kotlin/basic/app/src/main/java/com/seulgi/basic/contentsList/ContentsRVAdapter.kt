package com.seulgi.basic.contentsList

import android.content.Context
import android.content.Intent
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.seulgi.basic.R
import com.seulgi.basic.utils.FBRef
import com.seulgi.basic.utils.FBauth

// Model 값을 받는 것...
class ContentsRVAdapter(
        val context : Context,
        val items : ArrayList<ContentModel>,
        val keyList : ArrayList<String>,
        val bookmarkIdList : MutableList<String>)
        : RecyclerView.Adapter<ContentsRVAdapter.Viewholder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ContentsRVAdapter.Viewholder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.contents_rv_item, parent, false)

        Log.d("ContentsRVAdapter", keyList.toString())
        Log.d("ContentsRVAdapter", bookmarkIdList.toString())
        return Viewholder(v)
    }

    override fun onBindViewHolder(holder: ContentsRVAdapter.Viewholder, position: Int) {
        // 데이터가 바인딩 될 때마다 title, url등을 담은 items와 uid값을 담은 keylist가 들어옴
        holder.bindItems(items[position], keyList[position])
    }

    override fun getItemCount(): Int {
        return items.size
    }

    // 아이템 하나씩 뷰로
    inner class Viewholder(itemView: View) : RecyclerView.ViewHolder(itemView){
        // 모델 형식으로 받는다.
        fun bindItems(item : ContentModel, key : String) {
            itemView.setOnClickListener {
                Toast.makeText(context, item.title, Toast.LENGTH_SHORT).show()
                var intent = Intent(context, ContentShowActivity::class.java)
                intent.putExtra("url", item.webUrl)
                itemView.context.startActivity(intent)
            }

            // item view에 하나씩 넣어줌
            var contentsTitle = itemView.findViewById<TextView>(R.id.textArea)
            val imageViewArea = itemView.findViewById<ImageView>(R.id.imageArea)
            val bookmarkArea = itemView.findViewById<ImageView>(R.id.bookmarkArea)

            if (bookmarkIdList.contains(key)){
                bookmarkArea.setImageResource(R.drawable.bookmark_color)
            } else {
                bookmarkArea.setImageResource(R.drawable.bookmark_white)
            }

            bookmarkArea.setOnClickListener {
                Toast.makeText(context, key, Toast.LENGTH_SHORT).show()

                // 북마크가 있을 때
                if(bookmarkIdList.contains(key)){
                    FBRef.bookmarkRef
                            .child(FBauth.getUid())
                            .child(key)
                            .removeValue() // remove
                } else{ // 없을 때
                    FBRef.bookmarkRef
                            .child(FBauth.getUid())
                            .child(key)
                            .setValue(BookmarkModel(true))
                }
            }

            contentsTitle.text = item.title

            // Glide 를 통해 이미지 삽입(imageViewArea 에 넣는다)
            Glide.with(context)
                    .load(item.imageUrl)
                    .into(imageViewArea)

        }
    }

}