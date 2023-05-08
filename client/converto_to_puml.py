import os
import re
import sys

def extract_class_functions_attributes(file_path):
    if not os.path.isfile(file_path):
        return "Invalid file path"
    with open(file_path) as f:
        content = f.read()
        class_regex = r"(class|interface)\s+(\w+)\s*\{([\s\S]*?)(?<=\})\s*\}"
        class_matchs = re.findall(class_regex, content)
        if not class_matchs:
            return "No TypeScript class or intefaces found"
        class_and_interfaces = []
        for class_match in class_matchs:
            class_name = class_match[1]
            attributes_regex = r"([\w\?]+):\s*(\w+)"
            attributes_match = re.findall(attributes_regex, class_match[2])
            functions_regex = r"(\w+)\(([a-zA-Z\s=\(\)\[\]\.]*)\)\s*:\s*(\w+)\s*"
            functions_match = re.findall(functions_regex, class_match[2])
            class_and_interfaces.append({
                "interface_name": class_match[1] if class_match[0] == "interface" else "",
                "class_name": class_name if class_match[0] == "class" else "",
                "attributes": attributes_match,
                "functions": functions_match
            })
        return class_and_interfaces

def add_start_end_tag(plantuml: str):
    return "@startuml\n" + plantuml + "@enduml\n"

def generate_plantuml(classes_and_interfaces : list):
    plantuml = ""
    for class_or_interface in classes_and_interfaces:
        if class_or_interface["class_name"]:
            plantuml += f"class {class_or_interface['class_name']} {{\n"
        else:
            plantuml += f"interface {class_or_interface['interface_name']} {{\n"
        for attribute in class_or_interface["attributes"]:
            plantuml += f"\t{attribute[0]}: {attribute[1]}\n"
        for function in class_or_interface["functions"]:
            plantuml += f"\t{function[0]}(): {function[1]}\n"
        plantuml += "}\n\n"
    plantuml += "@enduml\n"
    return plantuml

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Please provide a file path")
        sys.exit(1)
    file_path = sys.argv[1]
    classes_and_interfaces = extract_class_functions_attributes(file_path)
    if not isinstance(classes_and_interfaces, list):
        print(classes_and_interfaces)
        sys.exit(1)
    plantuml = generate_plantuml(classes_and_interfaces)
    print(plantuml)
