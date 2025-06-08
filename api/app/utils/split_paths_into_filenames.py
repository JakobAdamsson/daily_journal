def split_paths_into_filenames(paths: list):
    print(paths)
    filenames = []
    for path in paths:
        filenames.append(path.split("\\")[-1])
    return filenames



def format_paths(paths):
    formatted_paths = []

    for path in paths:
        tmp = path.split("..")[1].replace("\\", "/")
        formatted_paths.append(tmp)

    return formatted_paths


def get_file_type(paths):
    filetypes = []

    for path in paths:
        tmp = path.split(".")[-1]
        filetypes.append(tmp)
    return filetypes