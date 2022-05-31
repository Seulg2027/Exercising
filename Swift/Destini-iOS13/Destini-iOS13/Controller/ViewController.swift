//
//  ViewController.swift
//  Destini-iOS13
//
//  Created by Angela Yu on 08/08/2019.
//  Copyright © 2019 The App Brewery. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var storyLabel: UILabel!
    @IBOutlet weak var choice1Button: UIButton!
    @IBOutlet weak var choice2Button: UIButton!
    
    var storyBrain = StoryBrain()
    var nextStoryNumber = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        updateUI()
        
    }

    @IBAction func choiceMade(_ sender: UIButton) {
        
        if (sender == choice1Button) {
            nextStoryNumber = storyBrain.nextStory(choice: "choice1")
            print(storyBrain.nextStory(choice: "choice1"))
        } else {
            nextStoryNumber = storyBrain.nextStory(choice: "choice2")
        }
        updateUI()
    }
    
    func updateUI() {
        storyLabel.text = storyBrain.storyDescrib[nextStoryNumber].title
        choice1Button.setTitle(storyBrain.storyDescrib[nextStoryNumber].choice1, for: .normal)
        choice2Button.setTitle(storyBrain.storyDescrib[nextStoryNumber].choice2, for: .normal)
    }
    
}

