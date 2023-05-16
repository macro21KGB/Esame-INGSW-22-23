import os
import re
import sys

def extract_props_and_component_name(file_path):
    with open(file_path) as f:
        content = f.read()
        component_name = re.findall(r"export default function (\w+)", content)[0]
        props = re.findall(r"interface (\w+Props) {([^}]+)}", content)[0][1].replace("?", "").replace(";", "").replace("=>", ":")
        return f"class {component_name} <<Boundary>> {{\n{props}\n}}"

if __name__ == "__main__":
    file_paths = []
    components = []

    for root, dirs, files in os.walk("."):
        for file in files:
            if file == "index.tsx":
                file_paths.append(os.path.join(root, file))

    for file_path in file_paths:
        
        try:
            components.append(extract_props_and_component_name(file_path))
        except Exception as e:
            print(f"Error in {file_path}")
            print(e)
            

    with open("react_components.puml", "w") as f:
        f.write("@startuml\n")
        for component in components:
            f.write(component)
            f.write("\n")
        f.write("@enduml\n")