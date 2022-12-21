echo "enter your commit:"

read commit
git add . ; git commit -m "$commit";

echo "enter your branch name:"
read branch_name

git push origin $branch_name