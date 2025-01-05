import os
import sys
import json

os.chdir('C:/Users/arham/OneDrive/Arham/BlenderProjects')

def createDir(projectName):
    os.mkdir(projectName)
    os.mkdir(projectName + "/renders")
    os.mkdir(projectName + "/references")
    os.mkdir(projectName + "/textures")
    
    print(projectName + " contains " + os.listdir())

req = sys.argv[1]
createDir(req)
