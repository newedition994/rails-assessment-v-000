class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      #test to see if this will redirect to home_path
      redirect_to user_path(@user)
    else
      redirect_to :new
    end
  end

  def show
    @message = params[:message] if params[:message]
    @message ||= false
  end

  def edit
  end

  def update
    if @user.update(user_params)
      redirect_to @user
    else
      render :edit
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :password, :happiness, :admin)
  end


end
