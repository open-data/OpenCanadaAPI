"""
usage:
splityaml.py openapi.yaml en openapi-en.json
splityaml.py openapi.yaml fr openapi-fr.json
"""

LANGUAGES = {'en', 'fr'}
POST_GET = 'post/get'

import json
import yaml
import sys

def split(d, lng):
    if isinstance(d, dict):
        if d.keys() == LANGUAGES:
            return d[lng]
        if d.keys() == {POST_GET}:
            return {
                'get': convert_post_to_get_params(d[POST_GET]),
                'post': d[POST_GET],
            }
    if isinstance(d, dict):
        return {k: split(v, lng) for (k, v) in d.items()}
    if isinstance(d, list):
        return [split(i, lng) for i in d]
    return d

def convert_post_to_get_params(post):
    props = post['requestBody']['content']['application/json']['schema']['properties']
    return {
        'summary': post['summary'],
        'description': post['description'],
        'parameters': [
            {
                'name': k,
                'in': 'query',
                'description': v['description'],
                'schema': {
                    'type': v['type'],
                },
                'examples': v.get('examples', {}),
            } for (k, v) in props.items()
        ],
        'responses': post['responses'],
    }

with open(sys.argv[1], encoding='utf-8') as r:
    doc = yaml.safe_load(r)

lang = sys.argv[2]
out = split(doc, lang)

with open(sys.argv[3], 'w', encoding='utf-8') as w:
    json.dump(out, w)
