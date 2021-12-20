package com.seulgi.basic.contentsList

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.seulgi.basic.R

    // Model 값을 받는 것...
class ContentsRVAdapter(val context : Context, val items : ArrayList<ContentModel>) : RecyclerView.Adapter<ContentsRVAdapter.Viewholder>() {

    // 아이템 하나를 클릭했을 때 이동,, 리사이클러뷰
    interface ItemClick {
        fun onClick(view : View, position: Int)
    }
    var itemClick : ItemClick? = null

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ContentsRVAdapter.Viewholder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.contents_rv_item, parent, false)
        return Viewholder(v)
    }

    override fun onBindViewHolder(holder: ContentsRVAdapter.Viewholder, position: Int) {
        // 아이템 하나를 클릭하였을 경우,, position 경로를 따라감
        if(itemClick != null) {
            holder.itemView.setOnClickListener{ v->
                itemClick?.onClick(v, position)
            }
        }
        holder.bindItems(items[position])
    }

    override fun getItemCount(): Int {
        return items.size
    }

    // 아이템 하나씩 뷰로
    inner class Viewholder(itemView: View) : RecyclerView.ViewHolder(itemView){
        // 모델 형식으로 받는다.
        fun bindItems(item : ContentModel) {
            // item view에 하나씩 넣어줌
            var contentsTitle = itemView.findViewById<TextView>(R.id.textArea)
            val imageViewArea = itemView.findViewById<ImageView>(R.id.imageArea)

            contentsTitle.text = item.title

            // Glide 를 통해 이미지 삽입(imageViewArea 에 넣는다)
            Glide.with(context)
                    .load(item.imageUrl)
                    .into(imageViewArea)

        }
    }

}