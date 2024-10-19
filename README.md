# | Aliases|
# ----------

# General aliases
# ===============
alias c='clear';

# Git aliases
alias gs="git status";
alias gb="git branch";
alias gl="git log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold
Yellow)%d%C(reset)'";
alias gd="git diff --full-index";
alias gdc="git diff --cached --full-index";
alias gsf="git show --full-index";
alias gb-delete-all="git branch | grep -v master | xargs -Iz git branch -D z";
# for when I am going too fast
alias sg="echo 'Whoa! Slow down'; git status";
alias gcm="git checkout master";
alias gpr="git pull --rebase";
