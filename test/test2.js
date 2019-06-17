class Folder {
    constructor(name) {
        this.name = name
        this.parent = null
        this.files = []
    }
    add(file) { 
        file.parent = this
        this.files.push(file)
     }
    scan() {
        console.log(`scan folder -  ${this.name}`)
        //for循环扫描子文件夹以及文件
        this.files.forEach(e=>{
            e.scan()
        })
    }
}

class File {
    constructor(name) {
        this.name = name
        this.parent = null
    }
    scan(){
        console.log(`scaned file -  ${this.name}`)
    }
}

var top = new Folder('top')
var level1_folder = new Folder('1-folder')
level1_folder.add(new File('2-file'))

top.add(level1_folder)
top.add(new File('1-file'))

top.scan()