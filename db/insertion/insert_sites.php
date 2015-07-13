<?php
	// Require system config file
    require '../../system/config.php';

    session_start();
    // Validate a user has logged in
    // If not logged in, redirect to the log in page
    if(!isset($_SESSION['login_id']))
    {
        header('Location:../../');
    }
    else
    {
        // If user has logged in
		require '../db_auth/db_con.php';

		$id= $_POST['data'];
		$facility_type = $_POST['type'];
		$central_id = $_POST['parent'];
		$program = $_POST['program'];

		// Date created
		$date_created = date("l")." ".date("Y-m-d")." ".date("h:i:sa");
        // User creating
        $created_by = $_SESSION["user_id"];

        $comment = "CREATED";

		/* ----------------------------------------------------------------------------------------------------------------- */
		/* ----------------------------------------------------------------------------------------------------------------- */

		// Sub-County Stores
		if($facility_type=="Sub-County Store")
		{
			$classification = "Sub-County Store";
			//Check if the facility exists
			$exists = "SELECT * FROM sub_county_stores WHERE sub_county_store_id = '$id'";
			$result = mysqli_query($conn,$exists);
			if(mysqli_num_rows($result)>0)
			{
				// Check if facility_program mapping exists from the facility_program_mapping table
				$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
				AND program_id = '$program' AND classification = '$classification'";
				$mappingResult = mysqli_query($conn,$checkMapping);
				if(mysqli_num_rows($mappingResult)>0)
				{
					echo 1;
				}
				// Exists as a sub-county store but not for this program
				else
				{
					$check_central = "SELECT * FROM central_site WHERE central_id = '$id'";
					$received_response = mysqli_query($conn,$check_central);
					if(mysqli_num_rows($received_response)>0)
					{
						// Check if facility_program mapping exists from the facility_program_mapping table as a
						// central site for this program
						$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
						AND program_id = '$program' AND classification = 'Central Site'";
						$mappingResult = mysqli_query($conn,$checkMapping);
						if(mysqli_num_rows($mappingResult)>0)
						{
							echo 12;
						}
						// Exists as a central site but not for this program
						else
						{
							// Check if facility_program mapping exists from the facility_program_mapping table as a
							// stand alone facility for this program
							$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = 'StandAlone'";
							$mappingResult = mysqli_query($conn,$checkMapping);
							if(mysqli_num_rows($mappingResult)>0)
							{
								echo 10;
							}
							// Exists as a standalone but not for this program
							else
							{
								$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
								created_on,created_by,comment)
								VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
								if (mysqli_query($conn, $mappingQuery))
								{
									echo 11;
									// Updated the mapping
								}

								else
								{
									echo -1;
								}
							}
						}
					}
					// Does not exist as a central site
					else
					{
						// Check if facility_program mapping exists from the facility_program_mapping table as a
						// stand alone facility for this program
						$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
						AND program_id = '$program' AND classification = 'StandAlone'";
						$mappingResult = mysqli_query($conn,$checkMapping);
						if(mysqli_num_rows($mappingResult)>0)
						{
							echo 10;
						}
						// Exists as a standalone but not for this program
						else
						{
							$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
							created_on,created_by,comment)
							VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
							if (mysqli_query($conn, $mappingQuery))
							{
								echo 11;
								// Updated the mapping
							}

							else
							{
								echo -1;
							}
						}
					}
				}
			}

			// Does not exist
			else
			{
				$check_central = "SELECT * FROM central_site WHERE central_id = '$id'";
				$received_response = mysqli_query($conn,$check_central);
				if(mysqli_num_rows($received_response)>0)
				{
					// Check if facility_program mapping exists from the facility_program_mapping table as a
					// central site for this program
					$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
					AND program_id = '$program' AND classification = 'Central Site'";
					$mappingResult = mysqli_query($conn,$checkMapping);
					if(mysqli_num_rows($mappingResult)>0)
					{
						echo 12;
					}
					else
					{
						// Exists as a central site but not for this program
						$check = "SELECT * FROM standalone_site WHERE standalone_id = '$id'";
						$response = mysqli_query($conn,$check);
						if(mysqli_num_rows($response)>0)
						{
							// Check if facility_program mapping exists from the facility_program_mapping table
							$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = 'StandAlone'";
							$mappingResult = mysqli_query($conn,$checkMapping);
							if(mysqli_num_rows($mappingResult)>0)
							{
								echo 10;
							}

							else
							{
								$sql = "INSERT INTO sub_county_stores(sub_county_store_id)
								VALUES ('$id')";

								if (mysqli_query($conn, $sql)) 
								{
									// Check if facility_program mapping exists from the facility_program_mapping table
									$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
									AND program_id = '$program' AND classification = '$classification'";
									$mappingResult = mysqli_query($conn,$checkMapping);
									if(mysqli_num_rows($mappingResult)>0)
									{
										echo 11;
									}

									else
									{
										$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
										created_on,created_by,comment)
										VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
										if (mysqli_query($conn, $mappingQuery))
										{
											echo 0;
										}

										else
										{
											echo -1;
										}
									}
								} 
								else 
								{
								    echo -1;
								}

							}
						}

						else
						{
							$sql = "INSERT INTO sub_county_stores(sub_county_store_id)
							VALUES ('$id')";

							if (mysqli_query($conn, $sql)) 
							{
								// Check if facility_program mapping exists from the facility_program_mapping table
								$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
								AND program_id = '$program' AND classification = '$classification'";
								$mappingResult = mysqli_query($conn,$checkMapping);
								if(mysqli_num_rows($mappingResult)>0)
								{
									echo 11;
								}

								else
								{
									$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
									created_on,created_by,comment)
									VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
									if (mysqli_query($conn, $mappingQuery))
									{
										echo 0;
									}

									else
									{
										echo -1;
									}
								}
							} 
							else 
							{
							    echo -1;
							}
						}

					}
				}
				// Does not exist as a central site at all
				else
				{
					$check = "SELECT * FROM standalone_site WHERE standalone_id = '$id'";
					$response = mysqli_query($conn,$check);
					if(mysqli_num_rows($response)>0)
					{
						// Check if facility_program mapping exists from the facility_program_mapping table
						$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
						AND program_id = '$program' AND classification = 'StandAlone'";
						$mappingResult = mysqli_query($conn,$checkMapping);
						if(mysqli_num_rows($mappingResult)>0)
						{
							echo 10;
						}

						else
						{
							$sql = "INSERT INTO sub_county_stores(sub_county_store_id)
							VALUES ('$id')";

							if (mysqli_query($conn, $sql)) 
							{
								// Check if facility_program mapping exists from the facility_program_mapping table
								$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
								AND program_id = '$program' AND classification = '$classification'";
								$mappingResult = mysqli_query($conn,$checkMapping);
								if(mysqli_num_rows($mappingResult)>0)
								{
									echo 11;
								}

								else
								{
									$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
									created_on,created_by,comment)
									VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
									if (mysqli_query($conn, $mappingQuery))
									{
										echo 0;
									}

									else
									{
										echo -1;
									}
								}
							} 
							else 
							{
							    echo -1;
							}

						}
					}

					else
					{
						$sql = "INSERT INTO sub_county_stores(sub_county_store_id)
						VALUES ('$id')";

						if (mysqli_query($conn, $sql)) 
						{
							// Check if facility_program mapping exists from the facility_program_mapping table
							$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = '$classification'";
							$mappingResult = mysqli_query($conn,$checkMapping);
							if(mysqli_num_rows($mappingResult)>0)
							{
								echo 11;
							}

							else
							{
								$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
								created_on,created_by,comment)
								VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
								if (mysqli_query($conn, $mappingQuery))
								{
									echo 0;
								}

								else
								{
									echo -1;
								}
							}
						} 
						else 
						{
						    echo -1;
						}
					}
					
				}
			}
		}

		/* ----------------------------------------------------------------------------------------------------------------- */
		/* ----------------------------------------------------------------------------------------------------------------- */

		// Central Sites
		else if($facility_type=="Central Site")
		{
			$classification = "Central Site";
			//Check if the facility exists
			$exists = "SELECT * FROM central_site WHERE central_id = '$id'";
			$result = mysqli_query($conn,$exists);
			if(mysqli_num_rows($result)>0)
			{
				// Check if facility_program mapping exists from the facility_program_mapping table
				$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
				AND program_id = '$program' AND classification = '$classification'";
				$mappingResult = mysqli_query($conn,$checkMapping);
				if(mysqli_num_rows($mappingResult)>0)
				{
					echo 1;
				}

				else
				{
					// Check if facility exists as a sub county store
					$check_central = "SELECT * FROM sub_county_stores WHERE sub_county_store_id = '$id'";
					$received_response = mysqli_query($conn,$check_central);
					if(mysqli_num_rows($received_response)>0)
					{
						// Check if facility_program mapping exists from the facility_program_mapping table as a
						// sub-county store for this program
						$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
						AND program_id = '$program' AND classification = 'Sub-County Store'";
						$mappingResult = mysqli_query($conn,$checkMapping);
						if(mysqli_num_rows($mappingResult)>0)
						{
							echo 12;
						}
						// Exists as a sub-county store but not for this program
						else
						{
							// Check if facility_program mapping exists from the facility_program_mapping table as a
							// stand alone facility for this program
							$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = 'StandAlone'";
							$mappingResult = mysqli_query($conn,$checkMapping);
							if(mysqli_num_rows($mappingResult)>0)
							{
								echo 10;
							}

							else
							{
								$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
								created_on,created_by,comment)
								VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
								if (mysqli_query($conn, $mappingQuery))
								{
									echo 11;
									// Updated the mapping
								}

								else
								{
									echo -1;
								}
							}

						}
					}
					// Does not exist as a sub-count store at all
					else
					{
						// Check if facility_program mapping exists from the facility_program_mapping table as a
						// stand alone facility for this program
						$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
						AND program_id = '$program' AND classification = 'StandAlone'";
						$mappingResult = mysqli_query($conn,$checkMapping);
						if(mysqli_num_rows($mappingResult)>0)
						{
							echo 10;
						}

						else
						{
							$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
							created_on,created_by,comment)
							VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
							if (mysqli_query($conn, $mappingQuery))
							{
								echo 11;
								// Updated the mapping
							}

							else
							{
								echo -1;
							}
						}
					}
				}
			}
			// Does not exist
			else
			{
				// Check if facility exists as a sub county store
				$check_central = "SELECT * FROM sub_county_stores WHERE sub_county_store_id = '$id'";
				$received_response = mysqli_query($conn,$check_central);
				if(mysqli_num_rows($received_response)>0)
				{
					// Check if facility_program mapping exists from the facility_program_mapping table as a
					// sub-county store for this program
					$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
					AND program_id = '$program' AND classification = 'Sub-County Store'";
					$mappingResult = mysqli_query($conn,$checkMapping);
					if(mysqli_num_rows($mappingResult)>0)
					{
						echo 12;
					}
					// exists as sub-county store but not for this program
					else
					{
						$check = "SELECT * FROM standalone_site WHERE standalone_id = '$id'";
						$response = mysqli_query($conn,$check);
						if(mysqli_num_rows($response)>0)
						{
							// Check if facility_program mapping exists from the facility_program_mapping table
							$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = 'StandAlone'";
							$mappingResult = mysqli_query($conn,$checkMapping);
							if(mysqli_num_rows($mappingResult)>0)
							{
								echo 10;
							}

							else
							{
								$sql = "INSERT INTO central_site(central_id)
								VALUES ('$id')";

								if (mysqli_query($conn, $sql)) 
								{
									// Check if facility_program mapping exists from the facility_program_mapping table
									$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
									AND program_id = '$program' AND classification = '$classification'";
									$mappingResult = mysqli_query($conn,$checkMapping);
									if(mysqli_num_rows($mappingResult)>0)
									{
										echo 11;
									}

									else
									{
										$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
										created_on,created_by,comment)
										VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
										if (mysqli_query($conn, $mappingQuery))
										{
											echo 0;
										}

										else
										{
											echo -1;
										}
									}
								} 
								else 
								{
								    echo -1;
								}

							}
						}

						else
						{
							$sql = "INSERT INTO central_site(central_id)
							VALUES ('$id')";

							if (mysqli_query($conn, $sql)) 
							{
								// Check if facility_program mapping exists from the facility_program_mapping table
								$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
								AND program_id = '$program' AND classification = '$classification'";
								$mappingResult = mysqli_query($conn,$checkMapping);
								if(mysqli_num_rows($mappingResult)>0)
								{
									echo 11;
								}

								else
								{
									$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
									created_on,created_by,comment)
									VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
									if (mysqli_query($conn, $mappingQuery))
									{
										echo 0;
									}

									else
									{
										echo -1;
									}
								}
							} 
							else 
							{
							    echo -1;
							}
						}
					}
				}

				else
				{
					$check = "SELECT * FROM standalone_site WHERE standalone_id = '$id'";
					$response = mysqli_query($conn,$check);
					if(mysqli_num_rows($response)>0)
					{
						// Check if facility_program mapping exists from the facility_program_mapping table
						$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
						AND program_id = '$program' AND classification = 'StandAlone'";
						$mappingResult = mysqli_query($conn,$checkMapping);
						if(mysqli_num_rows($mappingResult)>0)
						{
							echo 10;
						}
						// Exists as a standalone but not for this facility
						else
						{
							$sql = "INSERT INTO central_site(central_id)
							VALUES ('$id')";

							if (mysqli_query($conn, $sql)) 
							{
								// Check if facility_program mapping exists from the facility_program_mapping table
								$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
								AND program_id = '$program' AND classification = '$classification'";
								$mappingResult = mysqli_query($conn,$checkMapping);
								if(mysqli_num_rows($mappingResult)>0)
								{
									echo 11;
								}

								else
								{
									$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
									created_on,created_by,comment)
									VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
									if (mysqli_query($conn, $mappingQuery))
									{
										echo 0;
									}

									else
									{
										echo -1;
									}
								}
							} 
							else 
							{
							    echo -1;
							}

						}
					}
					// Does not exist as stand alone at all
					else
					{
						$sql = "INSERT INTO central_site(central_id)
						VALUES ('$id')";

						if (mysqli_query($conn, $sql)) 
						{
							// Check if facility_program mapping exists from the facility_program_mapping table
							$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = '$classification'";
							$mappingResult = mysqli_query($conn,$checkMapping);
							if(mysqli_num_rows($mappingResult)>0)
							{
								echo 11;
							}

							else
							{
								$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
								created_on,created_by,comment)
								VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
								if (mysqli_query($conn, $mappingQuery))
								{
									echo 0;
								}

								else
								{
									echo -1;
								}
							}
						} 
						else 
						{
						    echo -1;
						}
					}
				}
			}
		}

		/* ----------------------------------------------------------------------------------------------------------------- */
		/* ----------------------------------------------------------------------------------------------------------------- */

		// Satellite Sites
		else if($facility_type=="Satellite Site")
		{
			$classification = "Satellite Site";

			// PARENT TYPE
			// Sub-county store
			$parent_is_an_scs = "SELECT * FROM sub_county_stores WHERE sub_county_store_id = '$central_id'";
			$return_scs = mysqli_query($conn,$parent_is_an_scs);
			if(mysqli_num_rows($return_scs)>0)
			{
				$parent_type = "Sub-County Store";
			}

			// Central Site
			$parent_is_a_cs = "SELECT * FROM central_site WHERE central_id = '$central_id'";
			$return_cs = mysqli_query($conn,$parent_is_a_cs);
			if(mysqli_num_rows($return_cs)>0)
			{
				$parent_type = "Central Site";
			}

			//Check if the facility exists as a satellite
			$exists = "SELECT * FROM satelite_site WHERE satelite_id = '$id' AND central_id = '$central_id'";
			$result = mysqli_query($conn,$exists);
			if(mysqli_num_rows($result)>0)
			{
				// Check if facility_program mapping exists from the facility_program_mapping table
				$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
				AND program_id = '$program' AND classification = '$classification'";
				$mappingResult = mysqli_query($conn,$checkMapping);
				if(mysqli_num_rows($mappingResult)>0)
				{
					echo 1;
				}

				else
				{
					// Check if facility_program mapping exists from the facility_program_mapping table as a
					// stand alone facility for this program
					$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
					AND program_id = '$program' AND classification = 'StandAlone'";
					$mappingResult = mysqli_query($conn,$checkMapping);
					if(mysqli_num_rows($mappingResult)>0)
					{
						echo 10;
					}

					else
					{
						// Check if the satellite is classified as a central site if its parent is a sub-county store
						if($parent_type == "Sub-County Store")
						{
							// check if the satellite is classified as a central site
							$check_cs = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = 'Central Site'";
							$check_cs_result = mysqli_query($conn,$check_cs);
							if(mysqli_num_rows($check_cs_result)>0)
							{
								// Echo its a central site
								echo 13;
							}
							else
							{
								// Classify the satellite because its not classified as a central site
								$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
								created_on,created_by,comment)
								VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
								if (mysqli_query($conn, $mappingQuery))
								{
									echo 11;
									// Updated the mapping
								}

								else
								{
									echo -1;
								}
							}

						}

						else if($parent_type == "Central Site")
						{
							// Check if the satellite is classified as a sub-county store
							$check_scs = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = 'Sub-County Store'";
							$check_scs_result = mysqli_query($conn,$check_scs);
							if(mysqli_num_rows($check_scs_result)>0)
							{
								// Echo its a sub-county store
								echo 12;
							}
							else
							{
								// classify the satellite because its not classified as a sub-county store
								$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
								created_on,created_by,comment)
								VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
								if (mysqli_query($conn, $mappingQuery))
								{
									echo 11;
									// Updated the mapping
								}

								else
								{
									echo -1;
								}
							}
						}
					}
				}
			}

			// Facility does not exist yet
			else
			{
				$check = "SELECT * FROM standalone_site WHERE standalone_id = '$id'";
				$response = mysqli_query($conn,$check);
				if(mysqli_num_rows($response)>0)
				{
					// Check if facility_program mapping exists from the facility_program_mapping table as a standalone
					$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
					AND program_id = '$program' AND classification = 'StandAlone'";
					$mappingResult = mysqli_query($conn,$checkMapping);
					if(mysqli_num_rows($mappingResult)>0)
					{
						echo 10;
					}

					else
					{
						// Check if the satellite is classified as a central site if its parent is a sub-county store
						if($parent_type == "Sub-County Store")
						{
							// check if the satellite is classified as a central site
							$check_cs = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = 'Central Site'";
							$check_cs_result = mysqli_query($conn,$check_cs);
							if(mysqli_num_rows($check_cs_result)>0)
							{
								// Echo its a central site
								echo 13;
							}
							else
							{
								// Classify the satellite because its not classified as a central site
								$sql = "INSERT INTO satelite_site(satelite_id,central_id)
								VALUES ('$id','$central_id')";

								if (mysqli_query($conn, $sql)) 
								{
									// Check if facility_program mapping exists from the facility_program_mapping table
									$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
									AND program_id = '$program' AND classification = '$classification'";
									$mappingResult = mysqli_query($conn,$checkMapping);
									if(mysqli_num_rows($mappingResult)>0)
									{
										echo 11;
									}

									else
									{
										$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
										created_on,created_by,comment)
										VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
										if (mysqli_query($conn, $mappingQuery))
										{
											echo 0;
										}

										else
										{
											echo -1;
										}
									}
								} 
								else 
								{
								    echo -1;
								}
							}
						}

						else if($parent_type == "Central Site")
						{
							// Check if the satellite is classified as a sub-county store
							$check_scs = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = 'Sub-County Store'";
							$check_scs_result = mysqli_query($conn,$check_scs);
							if(mysqli_num_rows($check_scs_result)>0)
							{
								// Echo its a sub-county store
								echo 12;
							}
							else
							{
								// classify the satellite because its not classified as a sub-county store
								$sql = "INSERT INTO satelite_site(satelite_id,central_id)
								VALUES ('$id','$central_id')";

								if (mysqli_query($conn, $sql)) 
								{
									// Check if facility_program mapping exists from the facility_program_mapping table
									$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
									AND program_id = '$program' AND classification = '$classification'";
									$mappingResult = mysqli_query($conn,$checkMapping);
									if(mysqli_num_rows($mappingResult)>0)
									{
										echo 11;
									}

									else
									{
										$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
										created_on,created_by,comment)
										VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
										if (mysqli_query($conn, $mappingQuery))
										{
											echo 0;
										}

										else
										{
											echo -1;
										}
									}
								} 
								else 
								{
								    echo -1;
								}
							}
						}
					}
				}

				else
				{
					// Check if the satellite is classified as a central site if its parent is a sub-county store
					if($parent_type == "Sub-County Store")
					{
						// check if the satellite is classified as a central site
						$check_cs = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
						AND program_id = '$program' AND classification = 'Central Site'";
						$check_cs_result = mysqli_query($conn,$check_cs);
						if(mysqli_num_rows($check_cs_result)>0)
						{
							// Echo its a central site
							echo 13;
						}
						else
						{
							// Classify the satellite because its not classified as a central site
							$sql = "INSERT INTO satelite_site(satelite_id,central_id)
							VALUES ('$id','$central_id')";

							if (mysqli_query($conn, $sql)) 
							{
								// Check if facility_program mapping exists from the facility_program_mapping table
								$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
								AND program_id = '$program' AND classification = '$classification'";
								$mappingResult = mysqli_query($conn,$checkMapping);
								if(mysqli_num_rows($mappingResult)>0)
								{
									echo 11;
								}

								else
								{
									$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
									created_on,created_by,comment)
									VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
									if (mysqli_query($conn, $mappingQuery))
									{
										echo 0;
									}

									else
									{
										echo -1;
									}
								}
							} 
							else 
							{
							    echo -1;
							}
						}

					}

					else if($parent_type == "Central Site")
					{
						// Check if the satellite is classified as a sub-county store
						$check_scs = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
						AND program_id = '$program' AND classification = 'Sub-County Store'";
						$check_scs_result = mysqli_query($conn,$check_scs);
						if(mysqli_num_rows($check_scs_result)>0)
						{
							// Echo its a sub-county store
							echo 12;
						}
						else
						{
							// classify the satellite because its not classified as a sub-county store
							$sql = "INSERT INTO satelite_site(satelite_id,central_id)
							VALUES ('$id','$central_id')";

							if (mysqli_query($conn, $sql)) 
							{
								// Check if facility_program mapping exists from the facility_program_mapping table
								$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
								AND program_id = '$program' AND classification = '$classification'";
								$mappingResult = mysqli_query($conn,$checkMapping);
								if(mysqli_num_rows($mappingResult)>0)
								{
									echo 11;
								}

								else
								{
									$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
									created_on,created_by,comment)
									VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
									if (mysqli_query($conn, $mappingQuery))
									{
										echo 0;
									}

									else
									{
										echo -1;
									}
								}
							} 
							else 
							{
							    echo -1;
							}
						}
					}
				}
			}

		}

		/* ----------------------------------------------------------------------------------------------------------------- */
		/* ----------------------------------------------------------------------------------------------------------------- */

		// Stand alone sites
		else if ($facility_type=="StandAlone")
		{
			$classification = "StandAlone";
			//Check if the facility exists
			$exists = "SELECT * FROM standalone_site WHERE standalone_id = '$id'";
			$result = mysqli_query($conn,$exists);
			if(mysqli_num_rows($result)>0)
			{
				// Check if facility_program mapping exists from the facility_program_mapping table
				$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
				AND program_id = '$program' AND classification = '$classification'";
				$mappingResult = mysqli_query($conn,$checkMapping);
				if(mysqli_num_rows($mappingResult)>0)
				{
					echo 1;
				}
				// Exists as a standalone but not for this program
				else
				{
					/*Check if its a central site*/
					$check = "SELECT * FROM central_site WHERE central_id = '$id'";
					$response = mysqli_query($conn,$check);
					if(mysqli_num_rows($response)>0)
					{
						// Check if facility_program mapping exists from the facility_program_mapping table
						// as a central site
						$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
						AND program_id = '$program' AND classification = 'Central Site'";
						$mappingResult = mysqli_query($conn,$checkMapping);
						if(mysqli_num_rows($mappingResult)>0)
						{
							echo 10;
						}
						// Its a central site but not for this program
						else
						{
							// Check if its a sub-county store
							$check = "SELECT * FROM sub_county_stores WHERE sub_county_store_id = '$id'";
							$response = mysqli_query($conn,$check);
							if(mysqli_num_rows($response)>0)
							{
								// Check if facility_program mapping exists from the facility_program_mapping table
								// as a sub-county store
								$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
								AND program_id = '$program' AND classification = 'Sub-County Store'";
								$mappingResult = mysqli_query($conn,$checkMapping);
								if(mysqli_num_rows($mappingResult)>0)
								{
									echo 09;
								}

								// Its a sub-county store but not for this program
								else
								{
									/*CLASSIFY AS A STAND ALONE*/
									$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
									created_on,created_by,comment)
									VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
									if (mysqli_query($conn, $mappingQuery))
									{
										echo 11;
										// Updated the mapping
									}

									else
									{
										echo -1;
									}
								}
							}
							else
							{
								/*CLASSIFY AS A STAND ALONE*/
								$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
								created_on,created_by,comment)
								VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
								if (mysqli_query($conn, $mappingQuery))
								{
									echo 11;
									// Updated the mapping
								}

								else
								{
									echo -1;
								}
							}
						}

					}
					// Its not a central site
					else
					{
						// Check if its a sub-county store
						$check = "SELECT * FROM sub_county_stores WHERE sub_county_store_id = '$id'";
						$response = mysqli_query($conn,$check);
						if(mysqli_num_rows($response)>0)
						{
							// Check if facility_program mapping exists from the facility_program_mapping table
							// as a sub-county store
							$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = 'Sub-County Store'";
							$mappingResult = mysqli_query($conn,$checkMapping);
							if(mysqli_num_rows($mappingResult)>0)
							{
								echo 09;
							}

							// Its a sub-county store but not for this program
							else
							{
								/*CLASSIFY AS A STAND ALONE*/
								$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
								created_on,created_by,comment)
								VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
								if (mysqli_query($conn, $mappingQuery))
								{
									echo 11;
									// Updated the mapping
								}

								else
								{
									echo -1;
								}
							}
						}
						else
						{
							// Its not a sub-county store
							/*CLASSIFY AS A STAND ALONE*/
							$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
							created_on,created_by,comment)
							VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
							if (mysqli_query($conn, $mappingQuery))
							{
								echo 11;
								// Updated the mapping
							}

							else
							{
								echo -1;
							}
						}
					}
				}
			}
			// Does not exist
			else
			{
				$check = "SELECT * FROM central_site WHERE central_id = '$id'";
				$response = mysqli_query($conn,$check);
				if(mysqli_num_rows($response)>0)
				{
					// Check if facility_program mapping exists from the facility_program_mapping table
					// as a central site
					$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
					AND program_id = '$program' AND classification = 'Central Site'";
					$mappingResult = mysqli_query($conn,$checkMapping);
					if(mysqli_num_rows($mappingResult)>0)
					{
						echo 10;
					}

					else
					{
						// Check if its a sub-county store
						$check = "SELECT * FROM sub_county_stores WHERE sub_county_store_id = '$id'";
						$response = mysqli_query($conn,$check);
						if(mysqli_num_rows($response)>0)
						{
							// Check if facility_program mapping exists from the facility_program_mapping table
							// as a sub-county store
							$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = 'Sub-County Store'";
							$mappingResult = mysqli_query($conn,$checkMapping);
							if(mysqli_num_rows($mappingResult)>0)
							{
								echo 9;
							}

							// Its a sub-county store but not for this program
							else
							{
								/*CLASSIFY AS A SUB_COUNTY STORE*/
								$sql = "INSERT INTO standalone_site(standalone_id)
								VALUES ('$id')";

								if (mysqli_query($conn, $sql)) 
								{
									// Check if facility_program mapping exists from the facility_program_mapping table
									$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
									AND program_id = '$program' AND classification = '$classification'";
									$mappingResult = mysqli_query($conn,$checkMapping);
									if(mysqli_num_rows($mappingResult)>0)
									{
										echo 11;
									}

									else
									{
										$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
										created_on,created_by,comment)
										VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
										if (mysqli_query($conn, $mappingQuery))
										{
											echo 0;
										}

										else
										{
											echo -1;
										}
									}
								} 
								else 
								{
								    echo -1;
								}
							}
						}
						// Its not a sub-county store
						else
						{
							/*CLASSIFY AS A SUB_COUNTY STORE*/
							$sql = "INSERT INTO standalone_site(standalone_id)
							VALUES ('$id')";

							if (mysqli_query($conn, $sql)) 
							{
								// Check if facility_program mapping exists from the facility_program_mapping table
								$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
								AND program_id = '$program' AND classification = '$classification'";
								$mappingResult = mysqli_query($conn,$checkMapping);
								if(mysqli_num_rows($mappingResult)>0)
								{
									echo 11;
								}

								else
								{
									$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
									created_on,created_by,comment)
									VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
									if (mysqli_query($conn, $mappingQuery))
									{
										echo 0;
									}

									else
									{
										echo -1;
									}
								}
							} 
							else 
							{
							    echo -1;
							}
						}
					}
				}

				// Its not a central site
				else
				{
					// Check if its a sub-county store
					$check = "SELECT * FROM sub_county_stores WHERE sub_county_store_id = '$id'";
					$response = mysqli_query($conn,$check);
					if(mysqli_num_rows($response)>0)
					{
						// Check if facility_program mapping exists from the facility_program_mapping table
						// as a sub-county store
						$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
						AND program_id = '$program' AND classification = 'Sub-County Store'";
						$mappingResult = mysqli_query($conn,$checkMapping);
						if(mysqli_num_rows($mappingResult)>0)
						{
							echo 9;
						}

						// Its a sub-county store but not for this program
						else
						{
							/*CLASSIFY AS A SUB_COUNTY STORE*/
							$sql = "INSERT INTO standalone_site(standalone_id)
							VALUES ('$id')";

							if (mysqli_query($conn, $sql)) 
							{
								// Check if facility_program mapping exists from the facility_program_mapping table
								$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
								AND program_id = '$program' AND classification = '$classification'";
								$mappingResult = mysqli_query($conn,$checkMapping);
								if(mysqli_num_rows($mappingResult)>0)
								{
									echo 11;
								}

								else
								{
									$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
									created_on,created_by,comment)
									VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
									if (mysqli_query($conn, $mappingQuery))
									{
										echo 0;
									}

									else
									{
										echo -1;
									}
								}
							} 
							else 
							{
							    echo -1;
							}
						}
					}
					// Its not a sub-county store
					else
					{
						/*CLASSIFY AS A SUB_COUNTY STORE*/
						$sql = "INSERT INTO standalone_site(standalone_id)
						VALUES ('$id')";

						if (mysqli_query($conn, $sql)) 
						{
							// Check if facility_program mapping exists from the facility_program_mapping table
							$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = '$classification'";
							$mappingResult = mysqli_query($conn,$checkMapping);
							if(mysqli_num_rows($mappingResult)>0)
							{
								echo 11;
							}

							else
							{
								$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification,
								created_on,created_by,comment)
								VALUES ('$id','$program','$classification','$date_created','$created_by','$comment')";
								if (mysqli_query($conn, $mappingQuery))
								{
									echo 0;
								}

								else
								{
									echo -1;
								}
							}
						} 
						else 
						{
						    echo -1;
						}
					}
				}
			}
		}

		/* ----------------------------------------------------------------------------------------------------------------- */
		/* ----------------------------------------------------------------------------------------------------------------- */

		// close the connection
		mysqli_close($conn);
	}
?> 