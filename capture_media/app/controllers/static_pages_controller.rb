class StaticPagesController < ApplicationController
    def home
        @user = User.find_by_id(current_user.id)
    end
end
