git branch;

echo "enter your branch name:"
read branch_name

echo "enter your commit:"

read commit

git add . ; git commit -m "$commit";


git push origin $branch_name