#!/bin/bash

# Routine to generate markdown files for all the modules/subworkflows
# in the repository from the meta.yml files.

# Start with the modules, then the subworkflows.
cwd=$(realpath $(dirname $0))
output_dir=$1

cd $cwd/../modules/nf-neuro
for category in $(ls -d *); do
    cd $category
    for module in $(ls -d *); do
        echo "Converting $module"
        python $cwd/convert_module_yml_to_md.py $(realpath $module/meta.yml) $output_dir/Modules/$category/${module}.md
    done
    cd ..
done

cd $cwd/../subworkflows/nf-neuro
for subworkflow in $(ls -d *); do
    echo "Converting $subworkflow"
    python $cwd/convert_subworkflow_yml_to_md.py $(realpath $subworkflow/meta.yml) $output_dir/Subworkflows/${subworkflow}.md
done
