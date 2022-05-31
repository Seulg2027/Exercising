func greeting1() {
    print("hello")
    
    var myName = "Seulgi"
}

func greeting2() {
    print("Hey")
}


func loveCalculator() {
    let loveScore = Int.random(in: 0...100)
    
    if loveScore >= 80 {
        print("You love each other like ")
    } else if 40 <= loveScore {
        print("You go together like Coke and Mentos")
    } else {
        print("You'll be forever alone")
    }
}

struct Town {
    let name: String
    var citizens: [String]
    var resources: [String: Int]
    
    init(name: String, citizens: [String], resources: [String: Int]){
        self.name = name
        self.citizens = citizens
        self.resources = resources
    }
    
    func fortify() {
        print("Defences increased!")
    }
}

var anotherTown = Town(townName: "Name", people: ["Tom Hanks"], stats: ["Coconuts" : 500])
anotherTown.citizens.append("wilson")
print(anotherTown.citizens)
