package com.seulgi.basic.fragments

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.navigation.findNavController
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.ValueEventListener
import com.seulgi.basic.R
import com.seulgi.basic.contentsList.BookmarkRVAdapter
import com.seulgi.basic.contentsList.ContentModel
import com.seulgi.basic.databinding.FragmentBookmarkBinding
import com.seulgi.basic.databinding.FragmentTipBinding
import com.seulgi.basic.utils.FBRef
import com.seulgi.basic.utils.FBauth

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [BookmarkFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class BookmarkFragment : Fragment() {
    private lateinit var binding : FragmentBookmarkBinding

    // 로그 찍을 때 편의성
    private val TAG = BookmarkFragment::class.java.simpleName

    // RV 초기화할 때 필요한 변수들
    val bookmarkIdList = mutableListOf<String>()
    val items = ArrayList<ContentModel>()
    val keyList = ArrayList<String>()

    lateinit var rvAdapter : BookmarkRVAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_bookmark, container, false)

        // 2. 사용자가 북마크한 정보들을 가져옴
        getBookmarkData()
        // 어댑터 연결
        rvAdapter = BookmarkRVAdapter(requireContext(), items, keyList, bookmarkIdList)

        val rv : RecyclerView = binding.bookmarkRV
        rv.adapter = rvAdapter

        rv.layoutManager = GridLayoutManager(requireContext(), 2)


        binding.homeTap.setOnClickListener {
            it.findNavController().navigate(R.id.action_bookmarkFragment2_to_homeFragment2)
        }

        binding.talkTap.setOnClickListener {
            it.findNavController().navigate(R.id.action_bookmarkFragment2_to_talkFragment)
        }

        binding.storeTap.setOnClickListener {
            it.findNavController().navigate(R.id.action_bookmarkFragment2_to_storeFragment2)
        }

        binding.tipTap.setOnClickListener {
            it.findNavController().navigate(R.id.action_bookmarkFragment2_to_tipFragment)
        }

        return binding.root
    }

    private fun getCategoryData() {
        val postListener = object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {

                for (dataModel in dataSnapshot.children){
                    Log.d(TAG, dataModel.toString())
                    val item = dataModel.getValue(ContentModel::class.java)
                    // 3. 전체 컨텐츠 중 사용자가 북마크한 정보만 보여줌
                    if (bookmarkIdList.contains(dataModel.key.toString())){
                        items.add(item!!) // null 체크 꼭..
                        keyList.add(dataModel.key.toString())
                    }
                }
                rvAdapter.notifyDataSetChanged()

            }
            override fun onCancelled(databaseError: DatabaseError) {
                // Getting Post failed, log a message
                Log.w("ContentListActivity", "loadPost:onCancelled", databaseError.toException())
            }
        }
        FBRef.category1.addValueEventListener(postListener)
        FBRef.category2.addValueEventListener(postListener)
    }

    private fun getBookmarkData() {
        val postListener = object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                for (dataModel in dataSnapshot.children){
                    Log.e(TAG, dataModel.toString())
                    bookmarkIdList.add(dataModel.key.toString())
                }

                // 1. 전체 카테고리에 있는 Contents 데이터들을 모두 가져옴
                getCategoryData()

            }
            override fun onCancelled(databaseError: DatabaseError) {
                // Getting Post failed, log a message
                Log.w(TAG, "loadPost:onCancelled", databaseError.toException())
            }
        }
        FBRef.bookmarkRef
                .child(FBauth.getUid()) // 로그인 된 사용자의 북마크를 볼수 있음
                .addValueEventListener(postListener)
    }

}