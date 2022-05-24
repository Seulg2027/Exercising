//
//  ViewController.swift
//  EggTimer
//
//  Created by Angela Yu on 08/07/2019.
//  Copyright © 2019 The App Brewery. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet weak var progressBar: UIProgressView!
    @IBOutlet weak var titleLabel: UILabel!

    let eggTimes = ["Soft": 5, "Medium": 7, "Hard": 12]
    
    var secondsRemaining = 60
    var timer = Timer()
    var totalTime : Float = 0
    var secondsPassed : Float = 0
    
    @IBAction func buttonPressed(_ sender: UIButton) {
        timer.invalidate()
        
        // 1. guard를 붙인 방법
        guard let hardness = sender.currentTitle else {
            return
        }
        
        // 초기화
        secondsPassed = 0
        progressBar.progress = 0.0
        titleLabel.text = hardness
        
        // 2. !를 붙인 방법
        // let hardness: String = sender.currentTitle!
        
        totalTime = Float(eggTimes[hardness]!)
        
        Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(updateTimer), userInfo: nil, repeats: true)
    }
    
    // timer가 실행될 때 동작할 함수
    // @objc : objective-c 코드를 스위프트안에서도 사용할 수 있게 해주는 어노테이션
    @objc func updateTimer() {
        if secondsPassed < totalTime {
            secondsPassed += 1
            let percentageProgress = secondsPassed / totalTime
            // progressbar의 퍼센트를 변경
            progressBar.progress = Float(percentageProgress)
        } else {
            timer.invalidate() // 타이머 초기화
            titleLabel.text = "Done!"
        }
    }
    
}
