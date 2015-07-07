package main

/* generates our javascript object for custom skins */

import(
 "path/filepath"
 "fmt"
 "strings"
 "os/exec"
)

var path = "i/";

func main() {
	files, _ := filepath.Glob(path + "*")
	namesSlice := []string{};
	for _,basename := range files {
		name := strings.TrimSuffix(basename, filepath.Ext(basename))
		namesSlice = append(namesSlice, strings.Replace(name, path, "", -1));
	}
	fmt.Print("var ourskins = \"");
	fmt.Print(strings.Join(namesSlice, ":"));
	fmt.Println("\";");
	fmt.Println("grabbing source from github");
return;
	/* a work in progress */
	cmd := exec.Command("git", "clone", "https://github.com/electronoob/agarmods.git");
	err := cmd.Start();
	if err != nil {
		fmt.Println("some dome error occured: ", err);
	}
	err = cmd.Wait();
	if err != nil {
		fmt.Println("Command finished with: ", err);
	} else {
		cmd := exec.Command("cp", "agarmods/mods.js", "mods.js");
		cmd.Start();
		cmd.Wait();
		cmd = exec.Command("rm", "-rf", "agarmods");
		cmd.Start();
		cmd.Wait();
	}
	
}
