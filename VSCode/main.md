
## 1.安装VSCode时，未添加右键快速打开文件夹/文件的解决方案

1. 方案1： 重新安装VSCode
2. 方案2（推荐）： <br>
    手动添加注册表,新建纯文本文件，复制以下内容，将所有的`D:\\Develop\\Microsoft VS Code`替换成`你的本地VSCODE安装目录`后，文件后缀修改成`.reg`，`双击一路确定`即可
    ```
    Windows Registry Editor Version 5.00

    [HKEY_CLASSES_ROOT\*\shell\VSCode]
    @="Open with Code"
    "Icon"="D:\\Develop\\Microsoft VS Code\\Code.exe"

    [HKEY_CLASSES_ROOT\*\shell\VSCode\command]
    @="\"D:\\Develop\\Microsoft VS Code\\Code.exe\" \"%1\""

    Windows Registry Editor Version 5.00

    [HKEY_CLASSES_ROOT\Directory\shell\VSCode]
    @="Open with Code"
    "Icon"="D:\\Develop\\Microsoft VS Code\\Code.exe"

    [HKEY_CLASSES_ROOT\Directory\shell\VSCode\command]
    @="\"D:\\Develop\\Microsoft VS Code\\Code.exe\" \"%V\""

    Windows Registry Editor Version 5.00

    [HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode]
    @="Open with Code"
    "Icon"="D:\\Develop\\Microsoft VS Code\\Code.exe"

    [HKEY_CLASSES_ROOT\Directory\Background\shell\VSCode\command]
    @="\"D:\\Develop\\Microsoft VS Code\\Code.exe\" \"%V\""
    ```

## 2.有趣的插件