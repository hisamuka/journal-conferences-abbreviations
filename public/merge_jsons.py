import glob
import os
import json

all_journals = {}
json_paths_list = sorted(glob.glob("./public/json/*"))

for json_path in json_paths_list:
    key = json_path.split("/")[-1].split(".json")[0]

    with open(json_path) as json_file:
        journal_dict = json.loads(json_file.read())
        keys =journal_dict.keys()

        for k in keys:
            all_journals[k] = journal_dict[k]


with open('./public/all_journals.json', 'w') as all_jsons_file:
    json.dump(all_journals, all_jsons_file)

