package com.seulgi.basic.fragments

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.navigation.findNavController
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.ValueEventListener
import com.seulgi.basic.R
import com.seulgi.basic.board.BoardInsideActivity
import com.seulgi.basic.board.BoardListLVAdapter
import com.seulgi.basic.board.BoardModel
import com.seulgi.basic.board.BoardWriteActivity
import com.seulgi.basic.contentsList.ContentModel
import com.seulgi.basic.databinding.FragmentTalkBinding
import com.seulgi.basic.databinding.FragmentTipBinding
import com.seulgi.basic.utils.FBRef

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [TalkFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class TalkFragment : Fragment() {
    private lateinit var binding : FragmentTalkBinding

    // board들을 boardlist에 넣는다. 첫번째 방법
    private val boardDataList = mutableListOf<BoardModel>()
    // 두번째 방법
    private val boardKeyList = mutableListOf<String>()


    private var TAG = TalkFragment::class.java.simpleName
    private lateinit var boardLVAdapter : BoardListLVAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_talk, container, false)
// sample data
//        val boardList = mutableListOf<BoardModel>()
//        boardList.add(BoardModel("a", "b", "c", "d"))

        boardLVAdapter = BoardListLVAdapter(boardDataList)
        binding.boardListView.adapter = boardLVAdapter

        // 게시글 show page //
        // 1) ListView에 있는 데이터 title content time 모두 다른 액티비티로 전달
        // 2) id 값을 전달한 뒤 데이터를 받아오는 것... intent에서 extra로 전달하는 듯

        binding.boardListView.setOnItemClickListener{ parent, view, position, id ->
            val intent = Intent(context, BoardInsideActivity::class.java)
//            intent.putExtra("title", boardDataList[position].title)
//            intent.putExtra("content", boardDataList[position].content)
//            intent.putExtra("time", boardDataList[position].time)
            intent.putExtra("key", boardKeyList[position])
            startActivity(intent)
        }

        binding.writeBtn.setOnClickListener {
            val intent = Intent(context, BoardWriteActivity::class.java)
            startActivity(intent)
        }

        binding.homeTap.setOnClickListener {
            it.findNavController().navigate(R.id.action_talkFragment_to_homeFragment2)
        }

        binding.tipTap.setOnClickListener {
            it.findNavController().navigate(R.id.action_talkFragment_to_tipFragment)
        }

        binding.storeTap.setOnClickListener {
            it.findNavController().navigate(R.id.action_talkFragment_to_storeFragment2)
        }

        binding.bookTap.setOnClickListener {
            it.findNavController().navigate(R.id.action_talkFragment_to_bookmarkFragment2)
        }

        getFBBoardData()

        return binding.root
    }

    private fun getFBBoardData() {

        val postListener = object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                // firebase 특징,, 데이터가 겹치기 때문에 처음에 초기화 시켜줘야 함
                boardDataList.clear()

                for (dataModel in dataSnapshot.children){
                    Log.d(TAG, dataModel.toString())

                    val item = dataModel.getValue(BoardModel::class.java)
                    boardDataList.add(item!!)
                    boardKeyList.add(dataModel.key.toString()) // 키값을 집어넣는다..
                }
                boardDataList.reverse()
                boardKeyList.reverse() // 데이터가 reverse되기 때문에 key값도 똑같이 반대로 해줌
                boardLVAdapter.notifyDataSetChanged()
                Log.d(TAG, boardDataList.toString())
            }

            override fun onCancelled(databaseError: DatabaseError) {
                // Getting Post failed, log a message
                Log.w(TAG, "loadPost:onCancelled", databaseError.toException())
            }
        }
        FBRef.boardRef.addValueEventListener(postListener)
    }
}