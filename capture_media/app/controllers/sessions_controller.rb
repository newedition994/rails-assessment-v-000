class SessionsController < ApplicationController
  def destroy
    session.delete :user_id
    redirect_to '/'
  end

  def new
    @user = User.new
    @users = User.all
  end

  def create
    @user = User.find_by(:name params[:user][:name])
    if @user && @user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      redirect_to home_path(@user), notice: "Welcome back to Capture Media!"
    else
      redirect_to root_path
    end
  end
  
end

#user submittable attribute on the join table & fixing the login --> caption on appointment pictures and making appointment the join table