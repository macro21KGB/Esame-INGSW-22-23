import os
import re
import sys
from os import path


def extract_class_functions_attributes(file_path: str):
    if not path.isfile(file_path):
        raise FileNotFoundError(f"{file_path} is not a file")
    with open(file_path) as f:
        content = f.read()
        class_regex = r"(class|interface)\s+([\w ]+)\s*\{([\s\S]*?)(?<=\})\s*\}"
        class_matches = re.findall(class_regex, content)
        if not class_matches:
            raise Exception(f"No class or interface found in {file_path}")
        class_and_interfaces = []
        for class_match in class_matches:
            class_name = class_match[1]
            attributes_regex = r"([\w\?]+):\s*([\w\[\]\{\} \.]+);"
            attributes_match = re.findall(attributes_regex, class_match[2])
            functions_regex = (
                r"(\w+)\(\s?([\w\s=\[\],:]*)\)\s*:\s*([\w<>\.\{\} :,\[\]]+)\s*\{? "
            )
            functions_match = re.findall(functions_regex, class_match[2])
            class_and_interfaces.append(
                {
                    "interface_name": class_match[1]
                    if class_match[0] == "interface"
                    else "",
                    "class_name": class_name if class_match[0] == "class" else "",
                    "attributes": attributes_match,
                    "functions": functions_match,
                }
            )
        return class_and_interfaces


def generate_plantuml(classes_and_interfaces: list):
    plantuml = ""
    for class_or_interface in classes_and_interfaces:
        if class_or_interface["class_name"]:
            plantuml += f"class {class_or_interface['class_name']} {{\n"
        else:
            if "Props" in class_or_interface["interface_name"]:
                raise Exception("Props interface found")

            plantuml += f"interface {class_or_interface['interface_name']} {{\n"

        for attribute in class_or_interface["attributes"]:
            plantuml += f"\t{attribute[0]}: {attribute[1]}\n"

        plantuml += "\n"
        for function in class_or_interface["functions"]:
            plantuml += f"\t{function[0]}({function[1].strip()}): {function[2]}\n"

        plantuml += "}\n\n"
    return plantuml


def add_start_end_tag(plantuml: str):
    return "@startuml\n" + plantuml + "@enduml\n"
