class Package < ApplicationRecord
    has_many :appointments
    has_many :users, through: :appointments

    #has a description for the packages not captions on the table

    #scope :popular, -> { Appointment.includes(:package_id).where("package_id").uniq }
end
