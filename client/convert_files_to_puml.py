from converto_to_puml import (
    extract_class_functions_attributes,
    generate_plantuml,
    add_start_end_tag,
)
import sys


def read_all_ts_file_in_directory(start_directory: str = "./") -> list[str]:
    import os

    ts_files = []
    for root, dirs, files in os.walk(start_directory):
        if "node_modules" in dirs:
            dirs.remove("node_modules")

        dirs[:] = [d for d in dirs if not d.startswith(".")]

        # if the file have config in the name or a .d., skip it
        files[:] = [f for f in files if not f.endswith(".d.ts") and "config" not in f]

        for file in files:
            if file.endswith(".ts") or file.endswith(".tsx"):
                ts_files.append(os.path.join(root, file))
    return ts_files


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Please provide a starting directory")
        sys.exit(1)
    start_directory = sys.argv[1]
    ts_files = read_all_ts_file_in_directory(start_directory=start_directory)
    plantuml_files = []
    for file_path in ts_files:
        print(file_path)

        try:
            classes_and_interfaces = extract_class_functions_attributes(file_path)

            plantuml = generate_plantuml(classes_and_interfaces)
            plantuml_files.append(plantuml)
            print(plantuml)
        except Exception as e:
            continue

    final_file = add_start_end_tag("".join(plantuml_files))

    with open("output.puml", "w") as f:
        f.write(final_file)
